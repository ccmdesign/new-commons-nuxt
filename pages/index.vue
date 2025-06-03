<template>
  <nc-hero id="hero">
    <div class="hero__content">
      <div class="panel">
        <h1>New Commons Challenge</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <button>Join the Challenge Today</button>
      </div>
      <img src="" alt="Hero Image">
    </div>
  </nc-hero>

  <nc-base-section id="video-section" width="narrow">
    <h2>Video Section</h2>
  </nc-base-section>
  
  <nc-timeline id="timeline" />

  <nc-cta id="cta">
    <h2>FAQ</h2>
    <template #right>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
    </template>
  </nc-cta>

  <nc-cta id="cta-2" single-column="true">
    <div class="box">
      <h2>CTA 2</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
    </div>
  </nc-cta>

  <nc-blog id="blog" />

</template>

<script setup>

</script>

<style scoped>
.hero__content {
  display: grid;
  grid-template-columns: subgrid;
}

.hero__content > *:first-child {
  grid-column: content-start / col6;
}

.hero__content > *:last-child {
  grid-column: col7 / content-end;
}

.hero__content img {
  aspect-ratio: 1/1;
  outline: 1px solid red;
}
</style>