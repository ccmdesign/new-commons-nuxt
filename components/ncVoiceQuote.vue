<template>
  <blockquote class="nc-voice-quote__text" :class="`face-${face}`">
    {{ text }}
  </blockquote>
  <figcaption class="nc-voice-quote__attrib">
    <span class="nc-voice-quote__name">{{ name }}</span>
    <span class="nc-voice-quote__role">{{ role }}</span>
  </figcaption>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: '' },
  face: {
    type: String,
    default: 'serif',
    validator: (v) => ['serif', 'sans'].includes(v),
  },
})
</script>

<style scoped lang="scss">
.nc-voice-quote__text {
  margin: 0;
  color: var(--base-color);
  text-wrap: pretty;

  &.face-serif {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 400;
    font-size: clamp(25px, 3.1vw, 44px);
    line-height: 1.34;
    letter-spacing: -0.012em;
  }

  &.face-sans {
    font-family: var(--display-font);
    font-weight: 500;
    font-size: clamp(23px, 2.7vw, 38px);
    line-height: 1.3;
    letter-spacing: -0.022em;
  }
}

.nc-voice-quote__attrib {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: clamp(30px, 3.6vw, 48px);
}

.nc-voice-quote__name {
  font-family: var(--display-font);
  font-weight: 700;
  font-size: 17px;
  letter-spacing: -0.01em;
  color: var(--base-color);
}

.nc-voice-quote__role {
  font-family: var(--display-font);
  font-weight: 400;
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--base-color-60-tint);
  max-width: 60ch;
}
</style>
