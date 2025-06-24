<template>
  <div class="grid">
    <ncBioCard
      v-for="(judge, i) in observers"
      :key="judge.name"
      :judge="judge"
      :url="`/observers#${judge.slug}`"
    />
  </div>
</template>

<script setup>
import useObservers from '../composables/useObservers'
import ncBioCard from './ncBioCard.vue'

const observers = useObservers()
</script>

<style lang="scss" scoped>
.grid {
  --_grid-min-width: 200px;
}
</style>