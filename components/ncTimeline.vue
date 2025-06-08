<template>
  <ccm-base-section class="timeline | subgrid" background-color="gray">
    <div class="timeline__content">
      <h2>Timeline</h2>
      <p>Key dates for The New Commons Challenge:</p>
      <div class="timeline__content-cards">
        <div class="card-aux" v-for="i in 4" :key="i">
          <h3>Timeline Card</h3>
        </div>
      </div>
    </div>
  </ccm-base-section>
</template>


<script setup>

</script>

<style scoped>
.timeline {
  grid-column: full-start / full-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
}

.timeline {
}

.timeline__content {
  grid-template-columns: subgrid;
  padding: var(--space-2xl-3xl) 0;
}

.timeline__content-cards {
  margin-top: var(--space-xl-2xl);
  display: grid;
  grid-column: content-start / content-end;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--base-gutter);
}
</style>
