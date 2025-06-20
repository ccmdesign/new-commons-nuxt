<template>
  <div class="topbar | subgrid | cluster">
    <h1 class="h2"><nuxt-link to="/">
      <nc-logo-header />
    </nuxt-link></h1>
    <nav split>
      <ul class="topbar__nav | cluster">
        <!-- @TODO: Por algum motivo os NuxtLink não estão funcionando aqui. Só consegui fazer as rotas funcionar com o el="a" -->
        <li><nc-button el="a" href="/prize" color="base" variant="link">The Prize</nc-button></li>
        <li class="hide-on-mobile"><nc-button el="span" disabled   color="base" variant="link">Event</nc-button></li>
        <li class="hide-on-mobile"><nc-button el="span" disabled   color="base" variant="link">Winners</nc-button></li>
        <li><nc-button el="a" href="/blog"  color="base" variant="link">Blog</nc-button></li>
        <li><nc-button el="a" href="/faq"   color="base" variant="link">FAQ</nc-button></li>
        <li><nc-button el="a"               color="base" variant="link" href="https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0" target="_blank">Rules <nc-arrow-link-up /></nc-button></li>
        <!--<li><nc-button el="a" href="/apply" color="primary" variant="primary">Apply Now</nc-button></li>-->
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

@media (max-width: 768px) {
  .topbar h1,
  .topbar nav { margin-inline: auto; }
  .topbar ul { padding-inline: 0; }
   
}
</style>