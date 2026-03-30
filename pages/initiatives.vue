<template>
  <nc-base-section id="initiatives-header">
    <h4 class="subtitle">Our Initiatives</h4>
    <h1 class="title">Initiatives</h1>
    <p class="tagline">Explore New Commons initiatives supporting data commons for responsible AI.</p>
  </nc-base-section>

  <nc-base-section>
    <div class="initiatives-grid">
      <nc-initiative-card
        v-for="initiative in initiatives"
        :key="initiative.title"
        v-bind="initiative"
      />
    </div>
  </nc-base-section>
</template>

<script setup>
useHead({ title: 'Initiatives | New Commons' })
useSeoMeta({ description: 'Explore New Commons initiatives supporting data commons for responsible AI.' })

const initiatives = [
  {
    title: 'The 2025 Challenge',
    description: 'The inaugural New Commons Challenge awarded two $100,000 prizes to teams building data commons for responsible AI development.',
    status: 'Completed',
    to: '/the-2025-challenge',
    image: '/assets/patterns/hero.jpg',
  },
  {
    title: 'Indigenous Languages',
    description: 'Supporting the development of data commons that preserve and promote indigenous languages in the age of AI.',
    status: 'Coming Soon',
    to: '/incubator/indigenous-languages',
    image: '/assets/patterns/hero.jpg',
  },
]
</script>

<style scoped>
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

.initiatives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--base-gutter);
}
</style>
