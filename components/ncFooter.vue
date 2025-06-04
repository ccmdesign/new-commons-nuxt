<template>
  <div class="footer | subgrid">
    <div class="footer__logo footer__content">
      <h1>Footer</h1>
    </div>
    <div class="footer__col1 footer__content">
      <h2>Column 1</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
    <div class="footer__col2 footer__content">
      <h2>Column 2</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
    <div class="footer__col3 footer__content">
      <h2>Column 3</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>

    <by-line />
  </div>
</template>

<script setup>

</script>

<style scoped>
.footer {
  grid-column: full-start / full-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
  display: grid;
}

.footer__content {
  grid-template-columns: subgrid;  
}

.footer__logo,
.footer__col1,
.footer__col2,
.footer__col3 {
  grid-column: content-start / content-end;
  grid-template-rows: auto;
}

@media (min-width: 768px) {
.footer__logo {
  grid-column: content-start / content-end;
}

.footer__col1 {
  grid-column: content-start / col4;
}

.footer__col2 {
  grid-column: col5 / col7;
}

.footer__col3 {
  grid-column: col8 / content-end;
}

.footer {
  /* Aux styles */
  background-color: rgba(0, 0, 0, 0.5);
}
}
</style>