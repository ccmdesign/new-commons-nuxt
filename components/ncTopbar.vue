<template>
  <div class="topbar | subgrid | cluster">
    <h1 class="h2"><nuxt-link to="/">
      <nc-logo-header />
    </nuxt-link></h1>
    <nav split>
      <ul class="topbar__nav | cluster">
        <li><nc-button el="a" href="prize" color="base" variant="link">The Prize</nc-button></li>
        <li><nc-button el="a" href="event"   color="base" variant="link">Event</nc-button></li>
        <li><nc-button el="a" href="winners"   color="base" variant="link">Winners</nc-button></li>
        <li><nc-button el="a" href="blog"  color="base" variant="link">Blog</nc-button></li>
        <li><nc-button el="a" href="faq"   color="base" variant="link">FAQ</nc-button></li>
        <li><nc-button el="a" href="#"   color="base" variant="link">Rules <nc-arrow-link-up /></nc-button></li>
        <li><nc-button el="a" href="apply" color="primary" variant="primary">Apply Now</nc-button></li>
      </ul>
    </nav>   
  </div>
</template>

<script setup>

</script>

<style scoped>
.topbar {
  padding-block: var(--space-xs);
  grid-column: content-start / content-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
}

.topbar {
  /* Aux styles */
}

.topbar__nav li:not(:last-child) a {
  font-weight: 300;
}
</style>