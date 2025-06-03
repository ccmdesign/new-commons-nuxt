<template>
  <ccm-base-section class="video-section | subgrid" background-color="white-gray">
    <div class="video-section__content | stack | card-aux">
      <h1>Video Section</h1>  
    </div>
  </ccm-base-section>
</template>

<script setup>

</script>

<style scoped>
.video-section {

}

.video-section__content {
  aspect-ratio: 16/9;
  grid-column: col1 / col11; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
}

/* Aux styles */
.video-section__content {
}
</style>