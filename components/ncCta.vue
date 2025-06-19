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
}

.cta {
  color: var(--base-color);
}

.cta__content:first-child {
  grid-column: content-start / col6;
}

.cta__content:last-child {
  grid-column: col7 / content-end;
}

.cta__content:only-of-type {
  grid-column: content-start / content-end;
  text-align: center; 
}
</style>