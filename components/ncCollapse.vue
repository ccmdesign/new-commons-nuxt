<template>
  <details>
    <summary><h4>{{ data.summary }}</h4></summary>
    <slot><p>{{ data.content }}</p></slot>
  </details>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
    validator: (value) => {
      return 'summary' in value && 'content' in value;
    }
  }
});
</script>

<style lang="scss" scoped>

</style>