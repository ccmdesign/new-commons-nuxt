<template>
  <div class="with-sidebar">
    <slot>
      <div class="main-content">
        <nc-blog-card :content="firstPost" />
      </div>
      <aside>
        <div class="card-aux aside-card" v-for="post in restPosts" :key="post.slug">
          <div class="image-subgrid">
            <img  :src="getImage(post)" alt="">
          </div>
          <div class="">
            <span>{{formatDate(post.date)}}</span>
            <nuxt-link class="base-link" :to="`/blog/${post.slug}`"><h3>{{ post.heading }}</h3></nuxt-link>
            <p class="tagline">{{ post.tagline }}</p>
          </div>
        </div>
      </aside>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  posts: {
    type: Array
  }
})

const { getImage, formatDate } = usePost()

const [firstPost, ...restPosts] = props.posts
</script>

<style lang="scss" scoped>
.with-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--base-gutter);
}

aside {
  flex-grow: 1;
  
}

.main-content {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: 30%;
}

aside .card-aux {
  max-width: 31.25rem;
}

.aside-card {
  display: flex;
  gap: var(--space-xs-s);
  outline: 1px solid var(--black-color-10-tint);
  padding: var(--space-xs);
  border-radius: var(--border-radius-l);
}

.aside-card .image-subgrid {
  width: 100%;
  height: 100%;
  max-width: 133px;
  aspect-ratio: 1 / 1;
  border-radius: var(--border-radius-s);
}

.aside-card .image-subgrid img {
  border-radius: var(--size--1);
}

.base-link, tagline {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-aux {
  aspect-ratio: 0;
  margin-bottom: var(--space-xs-s);
}
</style>