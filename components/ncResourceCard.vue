<template>
  <component
    :is="hasLink ? 'a' : 'div'"
    v-if="content"
    class="resource-card"
    :href="hasLink ? getResourceLink(content) : undefined"
    :target="hasLink && isExternalLink(content) ? '_blank' : undefined"
    :rel="hasLink && isExternalLink(content) ? 'noopener noreferrer' : undefined"
  >
    <img
      :src="getImage(content)"
      :alt="content.title || 'Resource image'"
      class="resource-card__image"
    >
    <span class="resource-card__category">{{ content.category }}</span>
    <h3 class="resource-card__title">{{ content.title }}</h3>
    <p class="resource-card__description">{{ content.description }}</p>
    <ncButton v-if="hasLink" el="span" label="View resource" class="resource-card__cta | margin-top:s" />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const { getImage, getResourceLink, isExternalLink } = useResources()

const hasLink = computed(() => props.content && getResourceLink(props.content) !== '#')
</script>

<style lang="scss" scoped>
.resource-card {
  outline: 1px solid var(--black-color-10-tint);
  background-color: white;
  padding: var(--space-xs);
  border-radius: var(--border-radius-l);
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  gap: var(--space-xs);
}

.resource-card__image {
  border-radius: var(--border-radius-s);
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.resource-card__category {
  display: inline-block;
  font-size: var(--size--1);
  font-weight: 600;
  text-transform: uppercase;
  color: var(--primary-color);
  letter-spacing: 0.05em;
}

.resource-card__title { line-height: 1.35; }

.resource-card__description {
  font-size: var(--size-0);
  color: var(--base-color-70-tint);
  /* Clamp to 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.resource-card__cta {
  margin-top: auto;
}

.resource-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}
</style>
