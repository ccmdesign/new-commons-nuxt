<template>
  <nc-base-section id="resources-header">
    <h4 class="subtitle">Reports, Toolkits, and More</h4>
    <h1 class="title">Resources</h1>
    <p class="tagline">The Open Data Policy Lab's resources on data commons in the AI era.</p>
  </nc-base-section>

  <nc-base-section>
    <div class="grid resource-grid">
      <nc-resource-card
        v-for="resource in resources"
        :key="resource.slug"
        :content="resource"
      />
    </div>
    <p v-if="!resources?.length" class="text-align:center">
      No resources found.
    </p>
  </nc-base-section>
</template>

<script setup>
useHead({
  title: 'Resources | New Commons',
})
useSeoMeta({
  description: 'The Open Data Policy Lab\'s resources on data commons in the AI era.',
})

const { data: resources } = await useAsyncData('resources', () =>
  queryCollection('resources').order('sort', 'ASC').all()
)
</script>

<style scoped>
.resource-grid {
  --_grid-min-width: 300px;
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

.tagline {
  font-size: var(--size-1);
  color: var(--base-color-70-tint);
  font-weight: 300;
}
</style>
