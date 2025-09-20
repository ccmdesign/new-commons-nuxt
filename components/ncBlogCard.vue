<template>
  <NuxtLink
    v-if="content"
    class="blog-card | stack"
    :content="content"
    :aside-card="asideCard"
    :to="`/blog/${content.slug}`"
  >
    <img :src="getImage(content)" alt="" class="blog-card__image">
    <p class="blog-card__brow">{{formatDate(content.date)}}</p>
    <h3 class="blog-card__heading">{{ content.heading }}</h3>
    <p class="blog-card__excerpt">{{ content.excerpt }}</p>
    <span class="blog-card__cta">Read more</span>
  </NuxtLink>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    required: true
  },
  asideCard: {
    type: Boolean,
    default: false
  }
})

const getImage = (post) => {
  return post?.meta && post?.meta.body && post?.meta.body.cover_image ? post?.meta.body.cover_image : '/images/blog-fallback.webp'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

</script>

<style lang="scss" scoped>
.blog-card {
  outline: 1px solid var(--black-color-10-tint);
  background-color: white;
  padding: var(--space-xs);
  border-radius: var(--border-radius-l);
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;

  --_stack-space: var(--space-xs);

}

  .blog-card__image {
    border-radius: var(--border-radius-s);
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .blog-card__brow {
    font-weight: 600;
    line-height: 1.2em;
  }

  h3 { line-height: 1.35;}

  .blog-card__cta {
    margin-top: auto;
    font-weight: 600;
    color: var(--primary-color);
  }

  .blog-card:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
</style>
