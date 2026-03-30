<template>
  <div class="topbar | subgrid | cluster">
    <h1 class="h2"><nuxt-link to="/">
      <nc-logo-header />
    </nuxt-link></h1>
    <nav split>
      <ul class="topbar__nav | cluster">
        <li><nc-button to="/incubator/2026" color="base" variant="link">The Incubator</nc-button></li>
        <li><nc-button to="/the-2025-challenge" color="base" variant="link">The 2025 Challenge</nc-button></li>
        <li><nc-button to="/#initiatives" color="base" variant="link">Initiatives</nc-button></li>
        <li><nc-button to="/resources" color="base" variant="link">Resources</nc-button></li>
        <li><nc-button to="/blog" color="base" variant="link">Blog</nc-button></li>
        <li><nc-button to="/faq" color="base" variant="link">FAQ</nc-button></li>
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

.topbar__nav a svg { position: absolute; /* quick fix on the arrow link up. Not really a good solution. */ }

.topbar__nav li:not(:last-child) a {
  font-weight: 300;
}

@media (max-width: 768px) {
  .topbar h1,
  .topbar nav { margin-inline: auto; }
  .topbar ul { padding-inline: 0; }
   
}
</style>