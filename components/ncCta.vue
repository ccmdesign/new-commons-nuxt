<template>
  <ccm-base-section class="cta | subgrid" :single-column="singleColumn"  size="l">
    <div class="cta__content">
      <slot />
    </div>
    <div v-if="!singleColumn" class="cta__content">
      <slot name="right" />
    </div>
  </ccm-base-section>
</template>

<script setup>
const props = defineProps({
  singleColumn: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.cta {
  grid-column: full-start / full-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
  gap: var(--base-gutter);

  display: grid;
  grid-template-columns: subgrid;

  background-color: hsl(200, 64%, 15%);
  background-image:
    radial-gradient(circle at 95% 40%, hsla(298, 0%, 100%, 1) 0%, transparent 45%),
    radial-gradient(circle at 85% 20%, hsla(298, 0%, 100%, 1) 0%, transparent 40%),
    radial-gradient(circle at 100% 50%, hsla(298, 100%, 66%, 0.34) 0%, transparent 46%),
    radial-gradient(circle at 80% 10%, hsla(163, 100%, 66%, 0.34) 0%, transparent 46%),
    radial-gradient(circle at 90% 30%, hsla(224, 100%, 66%, 1) 0%, transparent 60%);
  background-blend-mode: overlay, overlay, normal, normal, normal;
  color: var(--white-color);
  overflow: hidden;
  position: relative;
}

.cta::before {
  content: '';
  position: absolute;
  top: -20%;
  right: -20%;
  width: 80%;
  height: 140%;
  background-image:
    radial-gradient(circle at 50% 50%, hsla(298, 0%, 100%, 0.6) 0%, transparent 60%),
    radial-gradient(circle at 60% 40%, hsla(224, 100%, 66%, 0.5) 0%, transparent 50%);
  animation: mesh-pulse 20s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes mesh-pulse {
  0% { opacity: 0.6; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.1); }
}

.cta__content {
  position: relative;
  z-index: 1;
}

.cta__content:first-child {
  grid-column: content-start / col8;
}

.cta__content:last-child {
  grid-column: col9 / content-end;
}

.cta__content:only-of-type {
  grid-column: content-start / content-end;
}

@media (max-width: 920px) {
  .cta__content:first-child,
  .cta__content:last-child {
    grid-column: content-start / content-end;
  }

  .cta {
    background-image:
      radial-gradient(circle at 95% 40%, hsla(298, 0%, 25%, 1) 0%, transparent 45%),
      radial-gradient(circle at 85% 20%, hsla(298, 0%, 25%, 1) 0%, transparent 40%),
      radial-gradient(circle at 100% 50%, hsla(298, 100%, 16.5%, 0.34) 0%, transparent 46%),
      radial-gradient(circle at 80% 10%, hsla(163, 100%, 16.5%, 0.34) 0%, transparent 46%),
      radial-gradient(circle at 90% 30%, hsla(224, 100%, 16.5%, 1) 0%, transparent 60%);
  }

  .cta::before {
    background-image:
      radial-gradient(circle at 50% 50%, hsla(298, 0%, 25%, 0.6) 0%, transparent 60%),
      radial-gradient(circle at 60% 40%, hsla(224, 100%, 16.5%, 0.5) 0%, transparent 50%);
  }
}
</style>