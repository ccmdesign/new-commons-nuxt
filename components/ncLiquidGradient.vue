<template>
  <canvas ref="canvas" class="liquid-gradient" />
</template>

<script setup>
const canvas = ref(null)
let gl = null
let animationId = null
let startTime = 0

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;

  // Hash-based pseudo-random
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // Gradient noise
  float gnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Fractional Brownian Motion — layered noise for organic texture
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
      value += amplitude * gnoise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  // Domain-warped FBM for marble/liquid swirl
  float marble(vec2 p, float time) {
    vec2 q = vec2(
      fbm(p + vec2(0.0, 0.0) + time * 0.04),
      fbm(p + vec2(5.2, 1.3) + time * 0.03)
    );

    vec2 r = vec2(
      fbm(p + 4.0 * q + vec2(1.7, 9.2) + time * 0.02),
      fbm(p + 4.0 * q + vec2(8.3, 2.8) + time * 0.025)
    );

    return fbm(p + 4.0 * r);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    // Correct aspect ratio
    uv.x *= u_resolution.x / u_resolution.y;

    float t = u_time;

    // Two layers of domain-warped marble at different scales
    float m1 = marble(uv * 2.5, t);
    float m2 = marble(uv * 1.8 + vec2(3.0), t * 0.7);
    float pattern = mix(m1, m2, 0.4);

    // Project brand colors (from CSS vars)
    // Primary:  hsl(195, 100%, 33%) ≈ #00819e → rgb(0, 129, 158)
    // Navy:     hsl(201, 100%, 18%) ≈ #005c8a → rgb(0, 92, 138) -- adjusted deeper
    // Base:     hsl(200, 64%, 15%) ≈ #0e2e3d → rgb(14, 46, 61)
    vec3 deepBlue   = vec3(0.055, 0.180, 0.239);  // base — darkest
    vec3 navy       = vec3(0.0, 0.361, 0.541);     // navy
    vec3 primary    = vec3(0.0, 0.506, 0.620);     // primary cyan-blue
    vec3 lightCyan  = vec3(0.753, 0.910, 0.953);   // light tint
    vec3 white      = vec3(1.0, 1.0, 1.0);

    // Map the marble pattern to color stops
    vec3 color;
    float p = pattern * 0.5 + 0.5; // remap from [-1,1] to [0,1]

    if (p < 0.3) {
      color = mix(deepBlue, navy, p / 0.3);
    } else if (p < 0.5) {
      color = mix(navy, primary, (p - 0.3) / 0.2);
    } else if (p < 0.7) {
      color = mix(primary, lightCyan, (p - 0.5) / 0.2);
    } else if (p < 0.85) {
      color = mix(lightCyan, white, (p - 0.7) / 0.15);
    } else {
      color = mix(white, lightCyan, (p - 0.85) / 0.15);
    }

    // Subtle vignette to darken edges
    vec2 center = gl_FragCoord.xy / u_resolution - 0.5;
    float vignette = 1.0 - dot(center, center) * 0.5;
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function initWebGL() {
  const cvs = canvas.value
  if (!cvs) return

  gl = cvs.getContext('webgl')
  if (!gl) {
    console.warn('WebGL not supported')
    return
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program))
    return
  }

  gl.useProgram(program)

  // Fullscreen quad
  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  const posLoc = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(posLoc)
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

  const uTime = gl.getUniformLocation(program, 'u_time')
  const uResolution = gl.getUniformLocation(program, 'u_resolution')

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2)
    cvs.width = cvs.clientWidth * dpr
    cvs.height = cvs.clientHeight * dpr
    gl.viewport(0, 0, cvs.width, cvs.height)
  }

  window.addEventListener('resize', resize)
  resize()

  startTime = performance.now()

  function render() {
    const elapsed = (performance.now() - startTime) / 1000
    gl.uniform1f(uTime, elapsed)
    gl.uniform2f(uResolution, cvs.width, cvs.height)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    animationId = requestAnimationFrame(render)
  }

  render()
}

onMounted(() => {
  initWebGL()
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
.liquid-gradient {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
