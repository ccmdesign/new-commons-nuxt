<template>
  <nc-hero>
    <div class="hero__content">
      <div class="panel stack">
        <nuxt-link to="/winners" class="h4 subtitle">← Back to Winners</nuxt-Link>  
        <h2 class="h1">{{ winner.title }}</h2>
        <p>
          Auctor adipiscing lectus aliquam elementum molestie nec. Sit netus varius eget enim nunc morbi venenatis quam velit. Vel augue dictum et mauris eget lobortis posuere amet. Tempor vitae in fermentum sit sit risus. Faucibus suscipit aliquam dolor iaculis.
        </p>
      </div>
    </div>
  </nc-hero>
  
</template>

<script setup>
const route = useRoute()
const { data: winner } = await useAsyncData('winner', () => queryCollection('winners')
  .where('slug', '=', route.params?.slug)
  .first())
</script>

<style scoped lang="scss">

.subtitle {
  font-size: var(--size-0);
  color: var(--primary-color);
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: var(--space-xs-s);
}

</style>