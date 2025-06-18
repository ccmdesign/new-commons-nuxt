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
  --column-size: 1fr;

  @media (min-width: 1120px) {
    --column-size: 5rem;
  }

  /* max-width: 1120px;
  margin: 0 auto; */
}

.master-grid {
  box-sizing: content-box;
  display: grid;
  grid-template-columns: 
    [full-start] minmax(var(--space-xs-m), 1fr) 
    [content-start] var(--column-size)
    [col1]  var(--column-size)
    [col2]  var(--column-size)
    [col3]  var(--column-size)
    [col4]  var(--column-size)
    [col5]  var(--column-size)
    [col6]  var(--column-size)
    [col7]  var(--column-size)
    [col8]  var(--column-size)
    [col9]  var(--column-size)
    [col10] var(--column-size)
    [col11] var(--column-size)
    [col12] var(--column-size)
    [content-end] minmax(var(--space-xs-m), 1fr) 
    [full-end];
  grid-auto-rows: auto;
  gap: 0;
  min-height: 100svh;
}
</style>
