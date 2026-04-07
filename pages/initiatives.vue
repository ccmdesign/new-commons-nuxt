<template>
  <nc-base-section id="initiatives-header" background-color="transparent" size="l">
    <h1 class="title">New Commons Initiatives</h1>
  </nc-base-section>

  <nc-base-section size="l">
    <div class="initiatives-grid">
      <nc-initiative-card
        v-for="initiative in initiatives"
        :key="initiative.title"
        v-bind="initiative"
      />
    </div>
  </nc-base-section>

  <nc-call-for-proposals>
    <template #secondary>
      <h3>Join Our Informational Webinars</h3>
      <p>Interested in applying for the Incubator? Join one of our informational webinars for more information about the application process and an open Q&amp;A.</p>
      <nc-button to="/incubator/2026/webinar" color="primary" variant="primary">Sign Up</nc-button>
    </template>
  </nc-call-for-proposals>
</template>

<script setup>
useHead({ title: 'Initiatives | New Commons' })
useSeoMeta({ description: 'Explore New Commons initiatives supporting data commons for responsible AI.' })

const initiatives = useInitiatives()
</script>

<style scoped>
.title {
  margin-bottom: var(--space-l-xl);
  font-weight: 600;
  font-size: var(--size-4);
}

.initiatives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--base-gutter);
}
</style>
