<template>
  <div class="hero | subgrid">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style scoped>
.hero {
  grid-column: full-start / full-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
  display: grid;
  grid-template-columns: subgrid;
}

.hero > * { grid-column: content-start / content-end; }

.hero { padding-bottom: var(--space-2xl-3xl); }

:deep(.hero__content) {
  display: flex;
  gap: var(--space-2xl-3xl);
  align-items: center;

  > * { flex: 1; }
}

:deep(.hero__announcement) {
  font-weight: 300;
  font-size: var(--size-0);
}

:deep(.hero__content img) { aspect-ratio: 1/1; }

</style>