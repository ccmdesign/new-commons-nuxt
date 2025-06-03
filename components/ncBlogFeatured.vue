<template>
  <div class="with-sidebar">
    <slot>
      <div class="main-content">
        <div class="card-aux">
          <h3>Lorem ipsum dolor sit</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
      </div>
      <aside class="stack">
        <div class="card-aux">
          <h3>Lorem ipsum dolor sit</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
        <div class="card-aux">
          <h3>Lorem ipsum dolor sit</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
        <div class="card-aux">
          <h3>Lorem ipsum dolor sit</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
      </aside>
    </slot>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.with-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--base-gutter);
}

aside {
  flex-grow: 1;
  
}

.main-content {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: 30%;
}

aside .card-aux {
  aspect-ratio: 12 / 4
}
</style>