<template>
  <nc-blog-post :blogpost="blogpost"></nc-blog-post>
</template>

<script setup>
const route = useRoute()
const { data: blogpost } = await useAsyncData('blogpost', () => queryCollection('blogposts')
  .where('slug', '=', 'building-the-future-of-public-interest-ai-certi-amazonia-institute-and-nyu-peace-research-announced-as-winners-of-the-new-commons-challenge')
  .first())
</script>

<style scoped>
</style>