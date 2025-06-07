<template>
  <div class="grid">
    <ncBioCard
      v-for="(judge, i) in judges"
      :key="judge.name"
      :img="judge.img"
      :name="judge.name"
      :description="judge.description"
    />
  </div>
</template>

<script setup>
import useJudges from '../composables/useJudges'
import ncBioCard from './ncBioCard.vue'

const judges = useJudges()
</script>

<style lang="scss" scoped>

</style>