<template>
  <master-grid>
    <nc-topbar id="topbar" />
    <nc-hero id="hero" />
    <slot />
    <nc-footer id="footer" />
  </master-grid>
</template>

<style>
#topbar {
  grid-row: 1 / 2;
  z-index: 2;
}

#hero {
  grid-row: 1 / 5;
  z-index: 1;
}

#footer {
  grid-row: 7 / 8;
  z-index: 1;
}
</style> 