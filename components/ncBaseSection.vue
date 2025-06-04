<template>
  <ccm-base-section class="nc-base-section | subgrid" :width="width">
    <div class="nc-base-section__content">
      <slot></slot>  
    </div>
  </ccm-base-section>
</template>

<script setup>
const props = defineProps({
  width: {
    type: String,
    default: 'content'
  }
})
</script>

<style scoped>
.nc-base-section {
  

}

[width="narrow"] .nc-base-section__content {
  @media (min-width: 768px) {
    grid-column: col1 / col11; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
  }
}

.nc-base-section__content {
  grid-column: content-start / content-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
}
</style>