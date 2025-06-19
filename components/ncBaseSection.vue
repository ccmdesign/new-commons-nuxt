<template>
  <ccm-base-section class="nc-base-section | subgrid" :width="width" :color="color">
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
  },
  color: {
    type: String,
    default: ''
  },
  backgroundImage: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.nc-base-section {
  --_section-color: transparent;

  background-color: var(--_section-background-color);
  color: var(--_section-color);
}

.nc-base-section[color="base"] {
  --_section-background-color: var(--base-color);
  --_section-color: var(--white-color);
}

.nc-base-section[color="primary"] {
  --_section-background-color: var(--primary-color);
  --_section-color: var(--white-color);
}

.nc-base-section[color="secondary"] {
  --_section-background-color: var(--secondary-color);
  --_section-color: var(--white-color);
}


[width="narrow"] .nc-base-section__content {
  @media (min-width: 768px) {
    grid-column: col2 / col11; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
  }
}

.nc-base-section__content {
  grid-column: content-start / content-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
}
</style>