<template>
  <nc-hero id="hero">
    <div class="hero__content">
      <div class="panel | stack">
        <h1>New Commons Incubator</h1>
        <p>The New Commons Incubator seeks to strengthen the pipeline of data commons for the AI era. Through structured programming, we aim to unlock the next generation of data commons and make the data ecosystem more sustainable and scalable.</p>
        <nc-button to="/incubator/2026" color="base" variant="primary">About the Incubator</nc-button>
      </div>
      <div class="hero__image-div">
        <nc-liquid-gradient />
        <nc-minimal-logo />
      </div>
    </div>
  </nc-hero>

  <nc-base-section color="faded" size="l">
    <div class="stack">
      <h2>Gradient Test Page</h2>
      <p>This page tests the WebGL liquid marble gradient as a replacement for the static hero.jpg image.</p>
    </div>
  </nc-base-section>
</template>

<script setup>
</script>

<style scoped lang="scss">
.hero__image-div {
  @media (max-width: 1120px) {
    display: none;
  }

  overflow: hidden;
  position: relative;
  aspect-ratio: 1/1;

  :deep(.liquid-gradient) {
    border-radius: var(--border-radius, 8px);
  }

  :deep(.minimal-logo) {
    position: absolute;
    top: -28%;
    left: 15%;
    width: 133%;
    animation-duration: 10s;
    animation-name: horizontal;
    animation-iteration-count: infinite;
    path {
      backdrop-filter: blur(32px);
      fill: var(--white-color);
      fill-opacity: 0.4;
    }
  }
}

@keyframes horizontal {
  0% { translate: 0%; }
  25% { translate: 2%; }
  50% { translate: 0%; }
  75% { translate: -2%; }
  100% { translate: 0%; }
}
</style>
