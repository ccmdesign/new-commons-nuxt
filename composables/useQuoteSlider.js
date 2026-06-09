import { ref, watch, unref, onMounted, onBeforeUnmount } from 'vue'

// Reusable slider behaviour for an editorial quote rotator: wrap-around
// navigation, auto-advance, pause-on-hide, and arrow-key control. Presentation
// (sizing the stage, markup) stays in the component — this owns only state.
//
// `total` and the options may be refs or plain values.
export default function useQuoteSlider(total, options = {}) {
  const { autoplay = true, speed = 8 } = options

  const current = ref(0)
  const previous = ref(null)
  const paused = ref(false)

  const count = () => Math.max(1, unref(total))

  function go(n) {
    const t = count()
    const next = ((n % t) + t) % t
    if (next !== current.value) previous.value = current.value
    current.value = next
  }
  const next = () => go(current.value + 1)
  const prev = () => go(current.value - 1)

  // ── auto-advance ──────────────────────────────────────────────────────────
  let timer = null
  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
  function schedule() {
    clear()
    if (paused.value || !unref(autoplay)) return
    timer = setTimeout(() => go(current.value + 1), Math.max(2, unref(speed)) * 1000)
  }
  // Re-arm whenever the slide, pause state, or timing inputs change — mirrors
  // the original effect's dependency list so a hover never leaves a timer live.
  watch(
    [current, paused, () => unref(autoplay), () => unref(speed)],
    schedule,
  )

  function onVisibility() {
    paused.value = document.hidden
  }
  function onKey(e) {
    if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') prev()
  }

  onMounted(() => {
    schedule()
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('keydown', onKey)
  })
  onBeforeUnmount(() => {
    clear()
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('keydown', onKey)
  })

  return { current, previous, paused, next, prev, go }
}
