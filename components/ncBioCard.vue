<template>
  <div class="nc-bio-card" >
    <img :src="`${imageBasePath}${judge.img}`" :alt="judge.name">
    <h4 class="h4 margin-top:s">{{ judge.name }}</h4>
    <p>{{ judge.description }}</p>
    <ncButton :to="url" variant="link" label="Read More" class="nc-bio-card__cta | margin-top:s" />
  </div>
</template>

<script setup>
defineProps({
  judge: { type: Object, required: true },
  url: { type: String, required: true },
  imageBasePath: { type: String, default: '/assets/judges/' },
})
</script>

<style scoped lang="scss">
.nc-bio-card {
  background-color: var(--white-color);
  border-radius: var(--border-radius-l);
  overflow: hidden;
  padding: var(--space-2xs);
  box-shadow: var(--box-shadow-s);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-2xs);
  height: 100%;


  img {
    border-radius: var(--border-radius-m);
    box-shadow: var(--box-shadow-s);
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: top;
    flex-shrink: 0;
  }

  h4 { font-weight: 600; }

  p {
    line-height: 120%;
    font-style: italic;
    margin-bottom: var(--size-0);
    flex: 1;
  }

  .nc-bio-card__cta {
    margin-top: auto;
    align-self: center;
  }

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
}
</style> 