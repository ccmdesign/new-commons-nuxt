<template>
    <div class="winners-grid">
      <div
        v-for="winner in winners"
        :key="winner.slug"
        class="winner-card"
      >
        <img
          :src="winner.image || '/images/blog-fallback.webp'"
          alt="Winner image"
          class="winner-card__image"
        />
        <span class="winner-card__country">{{ winner.country }}</span>
        <h3 class="h2">{{ winner.title }}</h3>
        <p class="h3">{{ winner.applicant }}</p>
        <p class="winner-card__description">{{ winner.description || 'No description available.' }}</p>
        <nuxt-link
          v-if="winner.project_url"
          :to="`/winners/${winner.slug}`"
          target="_blank"
          class="winner-card__link"
        >View details</nuxt-link>
      </div>
    </div>
</template>
<script setup>
const props = defineProps({ 
    winners: {
        type: Array,
        required: true
    }
})
</script>
<style scoped lang="scss">

.winners-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 1fr));
  gap: var(--base-gutter, 2rem);
  grid-column: content-start / content-end;
  margin-top: var(--space-xl);
}

@media (max-width: 768px) {
  .winners-grid {
    grid-template-columns: 1fr;
  }
}

.winner-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  position: relative;
}

.winner-card__image {
  border-radius: var(--border-radius-s, 8px);
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  margin-bottom: 1rem;
}

.winner-card__header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

  .winner-card__description {
    font-size: var(--size-0);
  }

.winner-card__country {
  background: var(--primary-color);
  color: var(--white-color);
  padding: 0.25em 0.75em;
  border-radius: 8px;
  font-size: 0.9em;
  font-weight: 600;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
}

.winner-card__link {
  margin-top: auto;
  color: var(--primary-color);
  font-weight: 600;
  text-align: center;
  text-decoration: none;
}
</style>