<template>
  <nc-hero>
    <div class="hero__content">
      <div class="panel">
        <h3>Winners of the New Commons Challenge</h3>
        <h2 class="h1">Winners</h2>
        <p>Auctor adipiscing lectus aliquam elementum molestie nec. Sit netus varius eget enim nunc morbi venenatis quam velit. Vel augue dictum et mauris eget lobortis posuere amet. Tempor vitae in fermentum sit sit risus. Faucibus suscipit aliquam dolor iaculis.</p>
      </div>
    </div>
  </nc-hero>

  <nc-base-section>
    <h2 class="h1">Winners</h2>
    <div class="switcher">
      <div class="card-aux">
        <h3>Winner 1</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </div>
      <div class="card-aux">
        <h3>Winner 1</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </div>
    </div>
  </nc-base-section>

  <nc-blog-section />
</template>

<script setup>

</script>

<style scoped>
.hero__content {
  @media (min-width: 768px) {
    grid-column: content-start / col6;
  }
}
</style>