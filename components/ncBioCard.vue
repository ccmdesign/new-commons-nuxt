<template>
  <div class="nc-bio-card | stack" >
    <img :src="`/assets/judges/${judge.img}`" :alt="judge.name">
    <h4 class="h4 margin-top:s">{{ judge.name }}</h4>
    <p>{{ judge.description }}</p>
    <a href="#" class="button" color="primary" variant="ghost">Read More</a>
  </div>
</template>

<script setup>
defineProps({
  judge: { type: Object, required: true }
})
</script>

<style scoped>
.nc-bio-card {
  background-color: var(--white-color);
  border-radius: var(--border-radius-l);
  overflow: hidden;
  padding: var(--space-2xs);
  box-shadow: var(--box-shadow-s);
  align-items: center;
  text-align: center;
  --_stack-space: var(--space-2xs);


  img {
    border-radius: var(--border-radius-m);
    box-shadow: var(--box-shadow-s);
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: top;
  }

  h4 { font-weight: 600; }
  
  p { 
    line-height: 1.45em; 
    margin-bottom: var(--space-2xs);
  }

  .button {
    margin-top: auto;
    align-self: center;
    width: 100%;
  }
}
</style> 