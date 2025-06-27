<template>
  <nc-base-section width="narrow">
    <nuxtLink class="button" variant="ghost" to="/blog">← Back to Blog</nuxtLink>
    <h3 class="brow" v-if="blogpost.brow">{{ blogpost.brow }}</h3>
    <h1>{{ blogpost.heading }}</h1>
    <p class="tagline" v-if="blogpost.tagline">{{ blogpost.tagline }}</p>
  </nc-base-section>

  <nc-base-section width="narrow">
    <div class="prose">
      <div v-html="blogpost.main_content"></div>  
    </div>
  </nc-base-section>
</template>

<script setup>
const route = useRoute()
const { data: blogpost } = await useAsyncData('blogpost', () => queryCollection('blogposts')
  .where('slug', '=', route.params?.slug)
  .first())
</script>

<style scoped>

</style>