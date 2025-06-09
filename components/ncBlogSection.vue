<template>
  <ccm-base-section class="blog | subgrid" background-color="gray-white">
    <div class="blog__content">
      <h1>Blog</h1>
      <div class="blog__content-cards">
        <div class="card-aux" v-for="i in posts" :key="i.id">
          <h3>{{ i.heading }}</h3>
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