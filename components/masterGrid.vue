<template>
  <div class="master-grid">
    <slot>
      <div class="aux-card" v-for="i in 47" :key="i">
        <p>Aux Card</p>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Teste'
}
</script>

<style scoped>
.master-grid {
  box-sizing: content-box;
  display: grid;
  grid-template-columns: [full-start] minmax(auto, var(--space-xs-m)) [content-start] 1fr [col1] 1fr [col2] 1fr [col3] 1fr [col4] 1fr [col5] 1fr [col6] 1fr [col7] 1fr [col8] 1fr [col9] 1fr [col10] 1fr [col11] 1fr [col12] 1fr [content-end] minmax(auto, var(--space-xs-m)) [full-end];
  grid-auto-rows: auto;
  gap: 0;
  min-height: 100svh;
}
</style>
