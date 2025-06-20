<template>
  <nc-base-section class="blog | subgrid" size="l">
      <div class="stack">
        <template v-if="showTitles">
          <h2>Blog</h2>
          <p>News and updates on the New Commons Challenge and its partners</p>
        </template>
        <div class="blog__content-cards">
          <nc-blog-card v-for="i in posts" :key="i.id" :content="i" />
        </div>
      </div>
  </nc-base-section>
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