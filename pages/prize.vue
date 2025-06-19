<template>
  <nc-hero>
    <div class="hero__content">
      <div class="panel">
        <p class="hero__brow">A Prize for a Shared Digital Future</p>
        <h1>What is the prize?</h1>
        <p>The New Commons Challenge is an initiative led by Microsoft and the Open Data Policy Lab, in partnership with DirectRelief, the Harvard Institutional Data Initiative, and UNESCO (international observer).</p>
        <p>The challenge addresses a critical issue: the limited access to diverse and high-quality datasets, which is essential for AI to reach its full potential. By creating and improving data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets, the gap in AI development can be filled. The challenge seeks to seed new data commons to ensure that AI benefits all.</p>
      </div>
    </div>
  </nc-hero>

  <nc-base-section class="fancy-bg" width="narrow" color="primary">
    <h2 class="text-align:center padding-block:m">What are we looking for?</h2>
    <div class="switcher">
      <div class="prize-card">
        <img src="/assets/icon-globe.svg" alt="Improve Localized Decision-making">
        <h3>Improve Localized Decision-making</h3>
        <p>Help local leaders make better policy or improve their reasoning capabilities through improved access to or insights from data</p>
      </div>
      <div class="prize-card">
        <img src="/assets/icon-people.svg" alt="Humanitarian Interventions">
        <h3>Humanitarian Interventions</h3>
        <p>Strengthen disaster response capabilities using AI.</p>
      </div>
    </div>
  </nc-base-section>

  <nc-base-section class="prize-cta" id="cta">
    <div class="cta-panel | switcher">
      <div class="stack" style="--_stack-space: var(--space-2xs)">
        <h2 class="h3">Prizes</h2>
        <p>The New Commons Challenge will select two winning proposals to receive the following support package:</p>
        <div class="cluster margin-top:auto padding-top:s">
          <div class="button" color="primary" variant="primary">Apply now</div>
          <div class="button | color:white-color" color="primary" variant="secondary">View Rules</div>
        </div>
      </div>
      <ul class="prize-list | stack">
        <li class="prize-item">
          <img src="/assets/trophy.svg" alt="Two winners">
          <p><span>Two</span> winners</p>
        </li>
        <li class="prize-item">
          <img src="/assets/money.svg" alt="USD 100,000">
          <p><span>USD 100,000</span> in funding each</p>
        </li>
        <li class="prize-item">
          <img src="/assets/mentorship.svg" alt="Mentorship">
          <p>Mentorship on establishing and managing data commons</p>
        </li>
        <li class="prize-item">
          <img src="/assets/support.svg" alt="Technical support">
          <p>Technical support as needed</p>
        </li>
        <li class="prize-item">
          <img src="/assets/globe.svg" alt="Network">
          <p>Access to the Open Data Policy Lab’s global network of experts</p>
        </li>
      </ul>
    </div>

    <div class="cta-panel | switcher">
      <div>
        <h2 class="h3">Who can apply?</h2>
      </div>
      <div class="stack" style="--_stack-space: var(--space-2xs)">
        <h4>Eligibility</h4>
        <p>We welcome proposals from diverse regions, communities, and organizations working with various data types. Your proposed data commons must aim to serve at least one of our key focus areas (Improve Localized Decision-making or Humanitarian Intervention).</p>
        <nc-button color="white" variant="link">Read here</nc-button>
        <h4 class="margin-top:s">Evaluation</h4>
        <p>Proposals will be reviewed by an international jury of experts from both focus areas.</p>
        <nc-button color="white" variant="link">Read here</nc-button>
      </div>
    </div>
  </nc-base-section>

  <nc-base-section>
    <h2 class="h2 color:base-color margin-bottom:l">Judges</h2>
    <nc-judges-grid />
  </nc-base-section>

  <nc-blog-section />
</template>

<script setup>

</script>

<style scoped>
.panel {
  max-width: 80ch;
}

.fancy-bg, .prize-cta { --overlap: 12rem; }

.fancy-bg {
  background-image: url('/assets/bg-prize.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-bottom: calc(var(--overlap) + var(--space-2xl));  
}

.prize-cta { margin-top: calc(var(--overlap) * -1); }

.switcher {
  --_switcher-space: var(--space-s);
}

.prize-card {
  background-color: var(--white-color);
  padding: var(--space-m);
  border-radius: var(--border-radius-m);
  color: var(--base-color);

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "icon title"
    "icon description";
  gap: var(--space-s);

  img {
    grid-area: icon;
  }

  h3 {
    grid-area: title;
    margin: 0;
    line-height: 1.2;
  }

  p {
    align-self: start;
    grid-area: description;
    margin: 0;
  }
}

.cta-panel {
  padding: var(--space-l-2xl);
  color: var(--white-color);

  &:first-child {
    background-color: var(--base-color);
    border-radius: var(--border-radius-m) var(--border-radius-m) 0 0;
  }

  &:last-child {
    background-color: var(--secondary-color);
    border-radius: 0 0 var(--border-radius-m) var(--border-radius-m);
  }
}

.prize-list {
  li {
    display: flex;  
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-s);

    p {
      margin: 0;
    }

    img {
      width: 2rem;
      height: 2rem;
      margin-left: -1.5rem;
    }

    span {
      font-weight: 600;
      font-size: 150%;
      color: var(--primary-color);
    }
  }
}

</style>