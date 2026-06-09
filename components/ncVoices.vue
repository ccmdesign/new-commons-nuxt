<template>
  <section class="nc-voices" :class="`align-${align}`" :style="sectionStyle">
    <div class="nc-voices__shell">
      <header class="nc-voices__head">
        <div class="nc-voices__eyebrow">
          <i class="nc-voices__sq" aria-hidden="true" />
          <span>{{ eyebrow }}</span>
        </div>
        <h2 class="nc-voices__title">{{ title }} <span class="nc-voices__title-em">{{ titleAccent }}</span>.</h2>
      </header>

      <div
        class="nc-voices__slider"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
      >
        <span class="nc-voices__mark" aria-hidden="true">&ldquo;</span>

        <div
          ref="stage"
          class="nc-voices__stage"
          :style="{ height: stageHeight ? stageHeight + 'px' : undefined }"
        >
          <div
            v-for="(quote, i) in quotes"
            :key="i"
            class="nc-voices__item"
            :class="itemState(i)"
            :aria-hidden="i !== current"
          >
            <nc-voice-quote
              :text="quote.text"
              :name="quote.name"
              :role="quote.role"
              :face="quoteFace"
            />
          </div>
        </div>

        <div class="nc-voices__controls">
          <div class="nc-voices__count">
            <span class="nc-voices__count-cur">{{ pad(current + 1) }}</span>
            <span class="nc-voices__count-sep">/</span>
            <span class="nc-voices__count-tot">{{ pad(quotes.length) }}</span>
          </div>

          <div class="nc-voices__track" aria-hidden="true">
            <span
              :key="trackKey"
              class="nc-voices__track-fill"
              :style="{
                animationDuration: Math.max(2, speed) + 's',
                animationPlayState: paused || !autoplay ? 'paused' : 'running',
                animationName: autoplay ? 'ncfill' : 'none',
              }"
            />
          </div>

          <div class="nc-voices__arrows">
            <button class="nc-voices__arrow" aria-label="Previous quote" @click="prev">
              <Icon name="ph:arrow-left" />
            </button>
            <button class="nc-voices__arrow" aria-label="Next quote" @click="next">
              <Icon name="ph:arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, toRef, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  // Content — defaults to the shared testimonials composable.
  testimonials: { type: Array, default: null },
  eyebrow: { type: String, default: 'Voices from the Commons' },
  title: { type: String, default: 'What people' },
  titleAccent: { type: String, default: 'say' },
  // Look & motion (mirrors the prototype's tweaks).
  accent: { type: String, default: '' },
  quoteFace: {
    type: String,
    default: 'serif',
    validator: (v) => ['serif', 'sans'].includes(v),
  },
  align: {
    type: String,
    default: 'center',
    validator: (v) => ['left', 'center'].includes(v),
  },
  autoplay: { type: Boolean, default: true },
  speed: { type: Number, default: 8 },
})

const quotes = computed(() => props.testimonials ?? useTestimonials())

const { current, previous, paused, next, prev } = useQuoteSlider(
  computed(() => quotes.value.length),
  { autoplay: toRef(props, 'autoplay'), speed: toRef(props, 'speed') },
)

const sectionStyle = computed(() =>
  props.accent ? { '--nc-voices-accent': props.accent } : {},
)
const pad = (n) => String(n).padStart(2, '0')
const itemState = (i) =>
  i === current.value ? 'is-in' : i === previous.value ? 'is-out' : 'is-idle'
// Re-keying the fill restarts its CSS animation on every relevant change.
const trackKey = computed(
  () => `${current.value}-${paused.value}-${props.speed}-${props.autoplay}`,
)

// ── stage sizing ────────────────────────────────────────────────────────────
// Items are absolutely stacked, so the stage has no intrinsic height. Measure
// the active item and animate the stage to match.
const stage = ref(null)
const stageHeight = ref(null)
let ro = null

const activeNode = () => stage.value?.querySelector('.nc-voices__item.is-in')
const measure = () => {
  const node = activeNode()
  if (node) stageHeight.value = node.offsetHeight
}
const observeActive = () => {
  if (!ro) return
  ro.disconnect()
  const node = activeNode()
  if (node) ro.observe(node)
}

onMounted(() => {
  measure()
  ro = new ResizeObserver(measure)
  observeActive()
  window.addEventListener('resize', measure)
  if (document.fonts?.ready) document.fonts.ready.then(measure)
})
onBeforeUnmount(() => {
  ro?.disconnect()
  window.removeEventListener('resize', measure)
})

watch(current, async () => {
  await nextTick()
  observeActive()
  measure()
})
watch(
  () => [props.quoteFace, props.align],
  async () => {
    await nextTick()
    measure()
  },
)
</script>

<style scoped lang="scss">
.nc-voices {
  --nc-voices-accent: var(--primary-color);
  --nc-voices-line: var(--base-color-10-alpha);

  /* Span the page's master grid full-bleed (like ccm-base-section), then
     center the shell — without this the bare section auto-places into a single
     grid track and collapses to a narrow column. */
  grid-column: full-start / full-end;
  width: 100%;
  padding: clamp(72px, 10vw, 148px) 24px;
  display: flex;
  justify-content: center;
}

.nc-voices__shell {
  width: 100%;
  max-width: 1080px;
}

/* ---- header ---- */
.nc-voices__head {
  margin-bottom: clamp(40px, 5vw, 68px);
}

.nc-voices__eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--base-color-60-tint);
  margin-bottom: 20px;
}

.nc-voices__sq {
  width: 7px;
  height: 7px;
  background: var(--nc-voices-accent);
  display: inline-block;
  flex: none;
}

.nc-voices__title {
  margin: 0;
  font-family: var(--display-font);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 0.95;
  font-size: clamp(40px, 6vw, 76px);
  color: var(--base-color);
}

.nc-voices__title-em {
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.01em;
  color: var(--nc-voices-accent);
}

/* ---- slider ---- */
.nc-voices__slider {
  position: relative;
}

.nc-voices__mark {
  position: absolute;
  top: -0.52em;
  left: -0.04em;
  font-family: 'Newsreader', Georgia, serif;
  font-style: italic;
  font-size: clamp(120px, 16vw, 200px);
  line-height: 1;
  color: var(--nc-voices-accent);
  opacity: 0.14;
  user-select: none;
  pointer-events: none;
}

.nc-voices__stage {
  position: relative;
  width: 100%;
  transition: height 520ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.nc-voices__item {
  position: absolute;
  inset: 0 0 auto 0;
  width: 100%;
}

/* enter / exit states */
.nc-voices__item.is-idle {
  opacity: 0;
  visibility: hidden;
  transform: translateY(14px);
}

.nc-voices__item.is-out {
  opacity: 0;
  transform: translateY(-14px);
  transition: opacity 360ms ease, transform 520ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.nc-voices__item.is-in {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition: opacity 560ms ease 90ms,
    transform 620ms cubic-bezier(0.22, 0.61, 0.36, 1) 90ms;
}

/* ---- alignment ---- */
.nc-voices.align-center .nc-voices__mark {
  left: 50%;
  transform: translateX(-50%);
}

.nc-voices.align-center .nc-voices__item {
  text-align: center;
}

.nc-voices.align-center .nc-voices__item :deep(.nc-voice-quote__attrib) {
  align-items: center;
}

/* ---- controls ---- */
.nc-voices__controls {
  display: flex;
  align-items: center;
  gap: clamp(20px, 4vw, 44px);
  margin-top: clamp(40px, 5vw, 64px);
  padding-top: 24px;
  border-top: 1px solid var(--nc-voices-line);
}

.nc-voices__count {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 13px;
  letter-spacing: 0.12em;
  color: var(--base-color-40-tint);
  flex: none;
}

.nc-voices__count-cur {
  color: var(--base-color);
}

.nc-voices__count-sep {
  margin: 0 6px;
  opacity: 0.5;
}

.nc-voices__track {
  position: relative;
  flex: 1 1 auto;
  height: 2px;
  background: var(--base-color-10-alpha);
  overflow: hidden;
}

.nc-voices__track-fill {
  position: absolute;
  inset: 0;
  background: var(--nc-voices-accent);
  transform-origin: left center;
  transform: scaleX(0);
  animation: ncfill linear forwards;
}

@keyframes ncfill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.nc-voices__arrows {
  display: flex;
  gap: 10px;
  flex: none;
}

.nc-voices__arrow {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 99px;
  border: 1px solid var(--nc-voices-line);
  background: transparent;
  color: var(--base-color);
  cursor: pointer;
  font-size: 1rem;
  transition: background 200ms ease, color 200ms ease, border-color 200ms ease,
    transform 160ms ease;
}

.nc-voices__arrow:hover {
  background: var(--base-color);
  color: var(--white-color);
  border-color: var(--base-color);
}

.nc-voices__arrow:active {
  transform: translateY(1px);
}

@media (prefers-reduced-motion: reduce) {
  .nc-voices__item,
  .nc-voices__stage {
    transition: none;
  }

  .nc-voices__track-fill {
    animation: none;
  }
}

@media (max-width: 620px) {
  .nc-voices__mark {
    font-size: 96px;
    top: -0.28em;
  }

  .nc-voices__controls {
    gap: 16px;
  }

  .nc-voices__arrow {
    width: 42px;
    height: 42px;
  }
}
</style>
