<template>
  <div class="topbar | subgrid | cluster">
    <h1 class="h2">Topbar</h1>
    <nav split>
      <ul class="topbar__nav | cluster">
        <li><a href="#">The Prize</a></li>
        <li><a href="#">Event</a></li>
        <li><a href="#">Winners</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Rules</a></li>
        <li><a href="#" class="button">Apply Now</a></li>
      </ul>
    </nav>   
  </div>
</template>

<script setup>

</script>

<style scoped>
.topbar {
  grid-column: content-start / content-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
}

.topbar {
  /* Aux styles */
}
</style>