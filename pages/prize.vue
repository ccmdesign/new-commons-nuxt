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
    <h2 class="text-align:center padding-block:l white-color h2">What are we looking for?</h2>
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

  <nc-base-section class="prize-cta" id="cta" color="faded">
    <div class="cta-panel | switcher">
      <div class="stack" style="--_stack-space: var(--space-2xs)">
        <h2>Prizes</h2>
        <p>The New Commons Challenge will select two winning proposals to receive the following support package:</p>
        <div class="cluster margin-top:auto padding-top:s">
          <!--<div class="button" color="primary" variant="primary">Apply now</div>-->
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
        <h2>Who can apply?</h2>
      </div>
      <div class="stack" style="--_stack-space: var(--space-2xs)">
        <h3>Eligibility</h3>
        <p>We welcome proposals from diverse regions, communities, and organizations working with various data types. Your proposed data commons must aim to serve at least one of our key focus areas (Improve Localized Decision-making or Humanitarian Intervention).</p>
        <nc-button color="white" variant="link">Read here <nc-arrow-link-up /></nc-button>
        <h3 class="margin-top:s">Evaluation</h3>
        <p>Proposals will be reviewed by an international jury of experts from both focus areas.</p>
        <nc-button color="white" variant="link">Read here <nc-arrow-link-up /></nc-button>
      </div>
      
    </div>
  </nc-base-section>

  <nc-base-section class="prize-tips" subgrid color="faded">
    <h2 class="margin-bottom:s">Helpful Tips</h2>
    <div class="stack">
      <h3>Our Blueprint</h3>
      <p>This Challenge aims to implement our recently published Blueprint to Unlock New Data Commons for Artificial Intelligence, which shows how organizations can launch data commons in the public interest. Organizations may find it useful to refer to this report as they develop their concept notes and proposals.</p>

      <h3 class="margin-top:l">Inspirational Examples</h3>
      <p>As this is an emerging area of practice, we understand that few organizations have developed data commons for AI. To help applicants think about how they may use data commons to support their work, we have assembled a list of instructive examples of data commons in action here.</p>
      
      <p>Please note that these data commons cover a range of topics beyond the areas of focus for this challenge.</p>
    </div>
  </nc-base-section>

  <nc-base-section color="faded" size="l">
    <h2 class="h2 color:base-color margin-bottom:l">Judges</h2>
    <nc-judges-grid />
    <h2 class="h2 color:base-color margin-block:l">International Observer</h2>
    <nc-observers-grid />
  </nc-base-section>

  <nc-blog-section id="blog" :posts="blogposts" />
</template>

<script setup>
const { data: blogposts } = await useAsyncData('blogposts', () => queryCollection('blogposts').limit(3).all())
</script>

<style scoped lang="scss"> 
.panel {
  max-width: 80ch;

  p {
    font-size: calc(var(--size-0) + 1px);
  }

  .hero__brow {
    text-transform: uppercase;
    color: var(--primary-color);
    font-weight: 800;
    font-size: var(--size-0);
  }
}

.fancy-bg, .prize-cta { --overlap: 12rem; }

.fancy-bg {
  background-image: url('/assets/bg-prize.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-bottom: calc(var(--overlap) + var(--space-2xl));  
}

.prize-cta { margin-bottom: calc(var(--overlap) * -1); }

.prize-cta > :first-child {
  position: relative;
  top: calc(var(--overlap) * -1);
  z-index: 1;
}

.switcher {
  --_switcher-space: var(--space-s);
}

.prize-card {
  background-color: var(--white-color);
  padding: 2.5rem;
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
    border-radius: 0 0 var(--border-radius-m) var(--border-radius-m);
    background: url('/assets/patterns/squares-left.svg') left bottom no-repeat, var(--secondary-color);
  }

  :deep(svg path) {
    stroke: var(--white-color);
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

.prize-tips {
  color: var(--base-color);
  h2 { grid-column: content-start / 5; }
  .stack { 
    grid-column: 5 / content-end; 
    --_stack-space: var(--space-xs);
  }

  h3 {
    font-size: var(--size-0);
    font-weight: 600;
    color: var(--primary-color);
    text-transform: uppercase;
  }

  h4 {
    font-size: var(--size-0);
  }
}

</style>