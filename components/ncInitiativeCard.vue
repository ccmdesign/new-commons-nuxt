<template>
  <component
    :is="to ? resolveComponent('NuxtLink') : 'div'"
    class="initiative-card"
    :to="to || undefined"
  >
    <div class="initiative-card__image-wrapper">
      <img
        :src="image || '/assets/patterns/hero.jpg'"
        :alt="title"
        class="initiative-card__image"
      >
      <span
        v-if="status"
        class="initiative-card__status"
        :data-status="statusSlug"
      >{{ status }}</span>
    </div>
    <h3 class="initiative-card__title">{{ title }}</h3>
    <p class="initiative-card__description">{{ description }}</p>
    <ncButton v-if="to" el="span" :label="ctaLabel" class="initiative-card__cta | margin-top:s" />
  </component>
</template>

<script setup>
import { resolveComponent, computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: '' },
  to: { type: String, default: '' },
  image: { type: String, default: '' },
  ctaLabel: { type: String, default: 'Learn more' },
})

const statusSlug = computed(() => {
  if (!props.status) return ''
  return props.status.toLowerCase().replace(/\s+/g, '-')
})
</script>

<style lang="scss" scoped>
.initiative-card {
  outline: 1px solid var(--black-color-10-tint);
  background-color: white;
  padding: var(--space-xs);
  border-radius: var(--border-radius-l);
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 150ms ease;
  gap: var(--space-xs);
}

.initiative-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.initiative-card__image-wrapper {
  position: relative;
}

.initiative-card__image {
  border-radius: var(--border-radius-s);
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.initiative-card__status {
  position: absolute;
  top: var(--space-2xs);
  left: var(--space-2xs);
  padding: var(--space-3xs) var(--space-xs);
  border-radius: 999px;
  font-size: var(--size--1);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.initiative-card__status[data-status="active"] {
  background-color: var(--primary-color);
  color: white;
}

.initiative-card__status[data-status="coming-soon"] {
  background-color: var(--base-color-07-tint);
  color: var(--base-color-70-tint);
}

.initiative-card__status[data-status="completed"] {
  background-color: var(--base-color);
  color: white;
}

.initiative-card__description {
  font-size: var(--size-0);
  color: var(--base-color-70-tint);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.initiative-card__cta {
  margin-top: auto;
}
</style>
