<template>
  <ccm-base-section class="blog | subgrid" background-color="gray-white">
    <div class="blog__content">
      <div class="stack">
        <template v-if="showTitles">
          <h2>Blog</h2>
          <p>News and updates on the New Commons Challenge and its partners</p>
        </template>
        <div class="blog__content-cards">
          <div class="card-aux" v-for="i in posts" :key="i.id">
            <div class="stack">
              <img :src="getImage(i)" alt="" class="card-aux__image">
              <p class="card-aux__brow">{{formatDate(i.date)}}</p>
              <nuxt-link class="base-link" :to="`/blog/${i.slug}`"><h3>{{ i.heading }}</h3></nuxt-link>
              <p class="card-aux__excerpt">{{ i.excerpt }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ccm-base-section>
</template>

<script setup>
defineProps({
  posts: {
    type: Array,
    default: () => []
  },
  showTitles: {
    type: Boolean,
    default: true
  }
})

const getImage = (post) => {
  return post.meta && post.meta.body && post.meta.body.cover_image ? post.meta.body.cover_image : '/images/blog-fallback.webp'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}
</script>

<style scoped>
.blog {
  grid-column: full-start / full-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
}

.blog {
}

.blog__content {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: content-start / content-end;
  gap: var(--base-gutter);
}

.blog__content > *:first-child {
  grid-column: content-start / content-end;
}

.blog__content-cards {
  display: grid;
  grid-column: content-start / content-end;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--base-gutter);
}
</style>