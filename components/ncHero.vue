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

.hero > * {
  grid-column: content-start / content-end;
}
</style>