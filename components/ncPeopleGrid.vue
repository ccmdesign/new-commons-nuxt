<template>
  <div class="grid">
    <ncBioCard
      v-for="person in collection"
      :key="person.slug"
      :judge="person"
      :url="`${basePath}#${person.slug}`"
      :image-base-path="imageBasePath"
    />
  </div>
</template>

<script setup>
import ncBioCard from './ncBioCard.vue'

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
