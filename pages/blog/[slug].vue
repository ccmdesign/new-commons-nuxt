<template>
  <nc-blog-post :blogpost="blogpost"></nc-blog-post>
</template>

<script setup>
const route = useRoute()
const { data: blogpost } = await useAsyncData('blogpost', () => queryCollection('blogposts')
  .where('slug', '=', route.params.slug)
  .first())
</script>

<style scoped>
</style>