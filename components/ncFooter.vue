<template>
  <div class="footer | subgrid">
    <div class="footer__logo footer__content">
      <nc-logo-footer />
    </div>
    <div class="footer__col1 footer__content">
      <h3>About ODPL</h3>
      <p>The Open Data Policy Lab supports decision-makers at the local, state and national levels as they accelerate the responsible re-use and opening of data for the benefit of society and the equitable spread of economic opportunity.</p>
      <div class="logos">
        <nc-odpl-logo />
        <nc-ms-logo />
        <nc-gov-lab-logo />
      </div>
    </div>
    <div class="footer__col2 footer__content">
      <h3>Follow Us</h3>
      <div class="logos">
        <nc-linkedin-logo />
        <nc-bluesky-logo />
        <nc-email-logo />
      </div>
    </div>
    <div class="footer__col3 footer__content stack">
    
      <div class="partners">
        <h3>Partners</h3>
        <div class="logos">
          <nc-direct-relief-logo />
          <img src="/assets/i-data.png" alt="Institutional Data Initiative" />
        </div>
      </div>
      <div class="international-observer">
        <h3>International Observer</h3>
        <div class="logos">
          <nc-unesco-logo />
        </div>
      </div>
    </div>
    <by-line />
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.footer {
  grid-column: full-start / full-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
  display: grid;
  background-color: #0E2F40;
  padding: var(--space-2xl-3xl) var(--space-2xl-3xl) 0;
}

.footer__logo {
  margin-bottom: var(--space-xl-2xl);
}

.footer__content {
  grid-template-columns: subgrid; 

  h3 {
    font-size: var(--size-0);
    font-weight: 700;
    margin-bottom: var(--space-xs-s);
  }

  p {
    margin-top: var(--space-xs-s);
    font-size: var(--size--1);
    margin-bottom: var(--space-l-xl);
  }

  &>* {
    color: var(--white-color);
  }

  .logos {
    display: flex; 
    align-items: center;
    gap: var(--space-s-m);

    img {
      mix-blend-mode: lighten;
    }
  }
}

.footer__logo,
.footer__col1,
.footer__col2,
.footer__col3 {
  grid-column: content-start / content-end;
  grid-template-rows: auto;
}

.footer__col2,
.footer__col3 {
  margin-top: var(--space-xl);
}

@media (min-width: 768px) {
  .footer__logo {
    grid-column: content-start / content-end;
  }

  .footer__col1 {
    grid-column: content-start / col5;
  }

  .footer__col2 {
    grid-column: col6 / col8;
    margin-top: 0;
  }

  .footer__col3 {
    grid-column: col9 / content-end;
    margin-top: 0;
  }

  .footer {
    /* Aux styles */
    
  }
}
</style>