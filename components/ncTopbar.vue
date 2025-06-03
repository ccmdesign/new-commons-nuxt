<template>
  <div class="topbar | subgrid | cluster">
    <h1 class="h2"><a href="/">New Commons Challenge</a></h1>
    <nav split>
      <ul class="topbar__nav | cluster">
        <li><a href="/prize" class="button" variant="ghost">The Prize</a></li>
        <li><a href="#" class="button" variant="ghost" disabled>Event</a></li>
        <li><a href="#" class="button" variant="ghost" disabled>Winners</a></li>
        <li><a href="/blog" class="button" variant="ghost">Blog</a></li>
        <li><a href="/faq" class="button" variant="ghost">FAQ</a></li>
        <li><a href="#" class="button" variant="ghost" disabled>Rules</a></li>
        <li><a href="/apply" class="button" variant="primary">Apply Now</a></li>
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