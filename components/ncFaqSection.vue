<template>
  <nc-base-section class="faq-section" >
    <slot />
  </nc-base-section>
</template>

<script setup>

</script>

<style scoped>
.faq-section > * {
  @media (min-width: 768px) {
    grid-column: content-start / content-end;
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: auto;
    gap: var(--base-gutter);
  }
}

.faq-section :deep(h3) {
  @media (min-width: 768px) {
    grid-column: content-start / col4;
  }
}

.faq-section :deep(details) {
  @media (min-width: 768px) {
    grid-column: col5 / content-end;
  }
}

</style>