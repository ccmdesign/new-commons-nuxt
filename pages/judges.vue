<template>
  <nc-base-section background-color="transparent">
    <h1 class="title">Judges</h1>
    <div class="stack margin-block:m">
      <div class="judge switcher" :id="j.slug" v-for="j in judges" :key="j.name">
        <img :src="`/assets/judges/${j.img}`" :alt="j.name">
        <div class="stack">
          <h2 class="h3">{{ j.name }}</h2>
          <p class="font-style:italic"><strong>{{ j.description }}</strong></p>
          <p>{{ j.bio }}</p>
        </div>
      </div>
    </div>
  </nc-base-section>
</template>

<script setup>
import useJudges from '../composables/useJudges'
const judges = useJudges()
</script>

<style scoped>
.judge {
  img {
    max-width: 240px;
    max-height: 240px;
    object-fit: cover;
    border-radius: 0.5rem;
  }
}
</style>