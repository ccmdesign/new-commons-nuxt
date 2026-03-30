<template>
  <div class="grid">
    <nc-bio-card
      v-for="person in collection"
      :key="person.slug"
      :judge="person"
      :url="`${basePath}#${person.slug}`"
      :image-base-path="imageBasePath"
    />
  </div>
</template>

<script setup>
defineProps({
  collection: { type: Array, required: true },
  basePath: { type: String, default: '/judges' },
  imageBasePath: { type: String, default: '/assets/judges/' },
})
</script>

<style lang="scss" scoped>
.grid {
  --_grid-min-width: 200px;
}
</style>
