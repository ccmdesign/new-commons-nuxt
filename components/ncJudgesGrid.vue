<template>
  <div class="grid">
    <ncBioCard
      v-for="(judge, i) in judges"
      :key="judge.name"
      :judge="judge"
      :url="`/judges#${judge.slug}`"
    />
  </div>
</template>

<script setup>
import useJudges from '../composables/useJudges'
import ncBioCard from './ncBioCard.vue'

const judges = useJudges()
</script>

<style lang="scss" scoped>
.grid {
  --_grid-min-width: 200px;
}
</style>