<template>
  <div class="topbar | subgrid | cluster">
    <h1 class="h2"><nuxt-link to="/">
      <nc-logo-header />
    </nuxt-link></h1>
    <nav split>
      <ul class="topbar__nav | cluster">
        <li><nc-button class="topbar__link" to="/incubator/2026" color="base" variant="link">The Incubator</nc-button></li>
        <li><nc-button class="topbar__link" to="/challenge-2025" color="base" variant="link">The 2025 Challenge</nc-button></li>
        <li><nc-button class="topbar__link" to="/initiatives" color="base" variant="link">Initiatives</nc-button></li>
        <li><nc-button class="topbar__link" to="/resources" color="base" variant="link">Resources</nc-button></li>
        <li><nc-button class="topbar__link" to="/blog" color="base" variant="link">Blog</nc-button></li>
        <li><nc-button class="topbar__link" to="/faq" color="base" variant="link">FAQ</nc-button></li>
      </ul>
    </nav>   
  </div>
</template>

<style scoped>
.topbar {
  padding-block: var(--space-xs);
  grid-column: content-start / content-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
}

.topbar {
  /* Aux styles */
}

.topbar__nav a svg { position: absolute; /* quick fix on the arrow link up. Not really a good solution. */ }

.topbar__link {
  font-weight: 500;
  text-decoration: none;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
  /* Lining figures — uniform height, align to cap height */
  font-variant-numeric: lining-nums;

  /* Oldstyle figures — varying heights, like lowercase letters */
  font-variant-numeric: oldstyle-nums;
}



@media (max-width: 768px) {
  .topbar h1,
  .topbar nav { margin-inline: auto; }
  .topbar ul { padding-inline: 0; }
   
}
</style>