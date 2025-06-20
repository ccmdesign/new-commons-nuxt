<template>
  <div class="announcement | stack | text-align:center" :content="content" :data-color="color">
    <slot><h3>{{ content }}</h3></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'base',
    validator: (value) => ['primary', 'base', 'accent', 'success', 'info', 'cancel'].includes(value)
  }
})

</script>

<style lang="scss" scoped>

.announcement {
  --_announcement-background-color: var(--base-color-07-tint);
  --_announcement-color: var(--base-color);
  
  margin-block: var(--space-s-m);
  background-color: var(--_announcement-background-color);
  color: var(--_announcement-color);
  padding: var(--space-xs);
  border-radius: var(--border-radius-l);
}

.announcement[data-color="primary"] {
  --_announcement-background-color: var(--primary-color-10-tint);
  --_announcement-color: var(--primary-color);
}

.announcement[data-color="accent"] {
  --_announcement-background-color: var(--accent-color-10-tint);
  --_announcement-color: var(--accent-color);
}

.announcement[data-color="red"] {
  --_announcement-background-color: var(--red-color-10-tint);
  --_announcement-color: var(--red-color);
}
</style>