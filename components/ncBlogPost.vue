<template>
    <nc-base-section width="narrow" class="blog-post__header | prose">
      <nuxtLink class="back-button button" variant="ghost" to="/blog">← Back to Blog</nuxtLink>
      <h3 class="brow" v-if="blogpost.brow">{{ blogpost.brow }}</h3>
      <h1>{{ blogpost.heading }}</h1>
      <p class="tagline" v-if="blogpost.tagline">{{ blogpost.tagline }}</p>
    </nc-base-section>
    <nc-base-section width="narrow" class="" v-if="blogpost.cover_image">
      <img :src="blogpost.cover_image" :alt="blogpost.heading" class="blog-post__header-image" />
    </nc-base-section>
  
    <nc-base-section width="narrow" class="blog-post__content | prose">
      <div class="prose">
        <div v-html="blogpost.main_content"></div>  
      </div>
    </nc-base-section>
  </template>
  
  <script setup>
        const props = defineProps({
            blogpost: {
                type: Object
            }
        })
  </script>
  
  <style scoped>
  .back-button { margin-left: calc(var(--_button-padding-inline) * -1); }
  .blog-post__header-image {
    border-radius: var(--space-2xs);
  }
  </style>