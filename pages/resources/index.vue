<template>
  <nc-base-section id="resources-header">
    <h4 class="subtitle">Reports, Toolkits, and More</h4>
    <h1 class="title">Resources</h1>
    <p class="tagline">Explore resources from the New Commons initiative.</p>
  </nc-base-section>

  <nc-base-section>
    <!-- Category filter buttons -->
    <div class="resource-filters | cluster">
      <button
        class="filter-pill"
        :class="{ 'filter-pill--active': !activeCategory }"
        @click="activeCategory = null"
      >All</button>
      <button
        v-for="cat in categoryList"
        :key="cat"
        class="filter-pill"
        :class="{ 'filter-pill--active': activeCategory === cat }"
        @click="activeCategory = cat"
      >{{ cat }}</button>
    </div>
  </nc-base-section>

  <nc-base-section>
    <div class="grid resource-grid">
      <nc-resource-card
        v-for="resource in filteredResources"
        :key="resource.slug"
        :content="resource"
      />
    </div>
    <p v-if="!filteredResources?.length" class="text-align:center">
      No resources found.
    </p>
  </nc-base-section>
</template>

<script setup>
useHead({
  title: 'Resources | New Commons',
})
useSeoMeta({
  description: 'Explore reports, toolkits, and resources from the New Commons initiative.',
})

const { data: resources } = await useAsyncData('resources', () =>
  queryCollection('resources').all()
)

const { categories } = useResources()

const activeCategory = ref(null)

const categoryList = computed(() => categories(resources.value))

const filteredResources = computed(() => {
  if (!activeCategory.value) return resources.value ?? []
  return (resources.value ?? []).filter(r => r.category === activeCategory.value)
})
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

.filter-pill {
  border: 1px solid var(--base-color-10-tint);
  background: white;
  padding: var(--space-3xs) var(--space-s);
  border-radius: 999px;
  font-size: var(--size--1);
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
  text-transform: capitalize;
}

.filter-pill--active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.filter-pill:hover:not(.filter-pill--active) {
  background: var(--base-color-07-tint);
}
</style>
