<template>
  <div class="topbar | subgrid | cluster">
    <h1 class="h2"><nuxt-link to="/">
      <nc-logo-header />
    </nuxt-link></h1>
    <nav split>
      <ul class="topbar__nav | cluster">
        <li><nc-button class="topbar__link" to="/incubator/2026" color="base" variant="link">The Incubator</nc-button></li>
        <li class="topbar__dropdown">
          <nc-button class="topbar__link" to="/initiatives" color="base" variant="link">Initiatives</nc-button>
          <ul class="topbar__submenu">
            <li><nc-button class="topbar__sublink" to="/incubator/indigenous-languages" color="base" variant="link">New Commons Incubator for Indigenous Languages and Cultures</nc-button></li>
            <li><nc-button class="topbar__sublink" to="/challenge-2025" color="base" variant="link">New Commons Challenge</nc-button></li>
          </ul>
        </li>
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

.topbar__dropdown {
  position: relative;
}

.topbar__submenu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 22rem;
  max-width: 26rem;
  margin: 0;
  padding: var(--space-2xs) 0;
  background: var(--white-color, #fff);
  border: 1px solid var(--base-color-10-tint);
  border-radius: var(--border-radius-m);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  list-style: none;
  display: none;
  z-index: 20;
}

.topbar__submenu li {
  display: block;
}

.topbar__sublink {
  display: block;
  width: 100%;
  padding: var(--space-2xs) var(--space-s);
  font-weight: 500;
  text-decoration: none;
  white-space: normal;
  text-align: left;
}

.topbar__dropdown:hover > .topbar__submenu,
.topbar__dropdown:focus-within > .topbar__submenu {
  display: block;
}

@media (max-width: 768px) {
  .topbar h1,
  .topbar nav { margin-inline: auto; }
  .topbar ul { padding-inline: 0; }

  .topbar__submenu {
    position: static;
    display: block;
    min-width: 0;
    max-width: none;
    padding: 0 0 0 var(--space-s);
    background: transparent;
    border: none;
    box-shadow: none;
  }
}
</style>