<template>
  <master-grid id="master-grid">
    <nc-topbar id="topbar" />
    <slot />
    <nc-footer id="footer" />
  </master-grid>
</template>

<style>
#topbar {
  grid-row: 1 / 2; /* Positioning the topbar at the first row in the master grid */
  z-index: 2; 
}

#hero {
  grid-row: 2 / 3; /* Positioning the hero at the first two rows in the master grid */
  z-index: 1;
}

#footer {
  grid-row: -1 / 0; /*  Positioning the footer at the last row in the master grid */
  z-index: 1;
}

#master-grid {
  background: url('./assets/patterns/squares-full.svg') 97% var(--space-2xl-3xl) no-repeat;
  background-size: auto;
}
</style> 