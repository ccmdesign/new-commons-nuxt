<template>
  <nc-hero>
    <div class="hero__content">
      <div class="panel stack">
        <p class="h4 subtitle">Winners of the New Commons Challenge</p>  
        <h2 class="h1">Winners</h2>
        <p>
          Auctor adipiscing lectus aliquam elementum molestie nec. Sit netus varius eget enim nunc morbi venenatis quam velit. Vel augue dictum et mauris eget lobortis posuere amet. Tempor vitae in fermentum sit sit risus. Faucibus suscipit aliquam dolor iaculis.
        </p>
      </div>
    </div>
  </nc-hero>

  <nc-base-section>
    <h2>2025</h2>
    <nc-winners :winners="winners" />
  </nc-base-section>

  <nc-blog-section :posts="blogposts" />
</template>

<script setup>
const { data: winners } = await useAsyncData('winners', () => queryCollection('winners')
  .all())

const { data: blogposts } = await useAsyncData('blogposts', () =>
  queryCollection('blogposts')
  .order('date', 'DESC').limit(3).all()
);
</script>

<style scoped>
</style>