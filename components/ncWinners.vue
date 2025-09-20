<template>
    <div class="winners-grid">
      <NuxtLink
        v-for="winner in winners"
        :key="winner.slug"
        class="winner-card"
        :to="`/winners/${winner.slug}`"
      >
        <img
          :src="winner.image || '/images/blog-fallback.webp'"
          alt="Winner image"
          class="winner-card__image"
        />
        <span class="winner-card__country">{{ winner.country }}</span>
        <h4 class="h5">{{ winner.prize }}</h4>
        <h3 class="h3">{{ winner.title }}</h3>

        <p
          v-if="winner.short_description"
          class="winner-card__description"
        >{{ winner.short_description }}</p>
        <div
          v-else-if="winner.description"
          class="winner-card__description"
          v-html="winner.description"
        />
        <p v-else class="winner-card__description">No description available.</p>

        <div class="winner-card__actions | padding-top:m">
          <span class="winner-card__cta">View details</span>
        </div>
      </NuxtLink>
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
  border: 1px solid var(--base-color-05-tint);
  // box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  position: relative;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 150ms ease, transform 150ms ease;
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

.winner-card__cta {
  margin-top: auto;
  font-weight: 600;
  color: var(--primary-color);
}

.winner-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}
</style>
