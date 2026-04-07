<template>
  <div class="banner">
    <div class="stack" style="--_stack-space: var(--space-3xs)">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
    <nc-button :to="to" color="base" variant="primary">{{ label }}</nc-button>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  to: { type: String, required: true },
  label: { type: String, default: 'Read More' },
})
</script>

<style scoped lang="scss">
.banner {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-l);
  background-color: var(--base-color-07-tint);
  border-radius: var(--border-radius-l);
  padding: var(--space-l);
  box-shadow: var(--box-shadow-l);

  h3 {
    margin-top: 0;
  }

  :deep(.button) {
    margin-top: auto;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
