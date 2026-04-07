<template>
  <nc-base-section v-if="resources?.length" :color="color" size="l">
    <div class="stack">
      <h2>{{ title }}</h2>
      <p v-if="tagline">{{ tagline }}</p>
      <div class="grid resource-grid">
        <nc-resource-card
          v-for="resource in resources"
          :key="resource.slug"
          :content="resource"
        />
      </div>
    </div>
  </nc-base-section>
</template>

<script setup>
defineProps({
  resources: { type: Array, default: () => [] },
  title: { type: String, default: 'Resources' },
  tagline: { type: String, default: null },
  color: { type: String, default: null },
})
</script>

<style scoped>
.resource-grid {
  --_grid-min-width: 300px;
}
</style>
