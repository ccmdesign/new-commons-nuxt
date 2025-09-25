<template>
  
    <nc-base-section id="blog-header" background-color="transparent">
      <h4 class="subtitle">News, Insights, and Impact</h4>  
      <h1 class="title">Blog</h1>
      <p class="tagline">News and updates on the New Commons Challenge and its partners.</p>
    </nc-base-section>

    <nc-base-section background-color="transparent">
      <nc-blog-featured :posts="featured" />
    </nc-base-section>

    <nc-base-section>
      <div class="grid blog-grid">
        <nc-blog-card v-for="post in blogposts" :key="post.slug" :content="post" />
      </div>
    </nc-base-section>
   
</template>

<script setup lang="ts">
const { data: blogposts } = await useAsyncData('blogposts', () => queryCollection('blogposts')
  .order('date', 'DESC')
  .all())
const { data: featured } = await useAsyncData('blogposts', () => queryCollection('blogposts')
  .order('date', 'DESC')
  .limit(4)
  .all())

const {getImage, formatDate} = usePost()
</script>

<style scoped>
.blog-grid {
  grid-template-columns: repeat(3, minmax(300px, 1fr));
}

.subtitle {
  font-size: var(--size-0);
  color: var(--primary-color);
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: var(--space-xs-s);
}

.title {
  margin-bottom: var(--space-l-xl);
  font-weight: 600;
  font-size: var(--size-4);
}


ul {
  li {

  }

  span {
    
  }
}
</style>
