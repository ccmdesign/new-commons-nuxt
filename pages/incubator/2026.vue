<template>
  <nc-hero>
    <div class="hero__content">
      <div class="panel">
        <!-- TODO(CCM-108): Replace with client copy — incubator hero brow, heading, and description -->
        <p class="hero__brow">2026 Cohort</p>
        <h1>The New Commons Incubator</h1>
        <p>[PLACEHOLDER] The New Commons Incubator is a 12-month programme that provides
           selected teams with funding, mentorship, and technical resources to build or
           strengthen data commons for responsible AI development.</p>
      </div>
    </div>
    <nc-announcement color="primary" class="hero__announcement">
      <div class="switcher">
        <div style="flex: 3;">
          <!-- TODO(CCM-108): Replace with client copy — 2025 challenge archive link text -->
          <h2>Explore the 2025 New Commons Challenge</h2>
          <p>[PLACEHOLDER] See the winning data commons and honorary distinctions from the inaugural Challenge.</p>
        </div>
        <nc-button class="hero__announcement-button" to="/the-2025-challenge" color="primary" variant="primary" style="align-self: center;">The 2025 Challenge</nc-button>
      </div>
    </nc-announcement>
  </nc-hero>

  <!-- TODO(CCM-108): Replace with client copy — program overview -->
  <nc-base-section>
    <h2>Program Overview</h2>
    <div class="switcher">
      <div class="stack">
        <p>[PLACEHOLDER] The New Commons Incubator is a 12-month programme run by the
           Open Data Policy Lab that helps teams build and sustain data commons for
           responsible AI development. Each cohort receives tailored support to move
           from concept to implementation.</p>
        <p>[PLACEHOLDER] Building on the success of the New Commons Challenge, the Incubator
           takes a deeper, hands-on approach — working closely with selected teams to
           address technical, governance, and sustainability challenges.</p>
      </div>
    </div>
  </nc-base-section>

  <!-- TODO(CCM-108): Replace with client copy — what we offer cards -->
  <nc-base-section class="section-bg" color="primary">
    <h2 class="text-align:center padding-block:l white-color h2">What We Offer</h2>
    <div class="offer-cards">
      <div class="offer-card">
        <img src="/assets/money.svg" alt="Funding">
        <h3>Funding</h3>
        <p>[PLACEHOLDER] Up to $X in grant funding to support the development or enhancement of your data commons over 12 months.</p>
      </div>
      <div class="offer-card">
        <img src="/assets/mentorship.svg" alt="Mentorship">
        <h3>Mentorship &amp; Guidance</h3>
        <p>[PLACEHOLDER] Regular access to experts in data governance, AI ethics, and commons management from the Open Data Policy Lab network.</p>
      </div>
      <div class="offer-card">
        <img src="/assets/support.svg" alt="Technical Support">
        <h3>Technical Support</h3>
        <p>[PLACEHOLDER] Hands-on technical assistance with data infrastructure, interoperability standards, and platform development.</p>
      </div>
      <div class="offer-card">
        <img src="/assets/globe.svg" alt="Network Access">
        <h3>Network Access</h3>
        <p>[PLACEHOLDER] Connect with the Open Data Policy Lab's global network of policymakers, technologists, and data practitioners.</p>
      </div>
    </div>
  </nc-base-section>

  <!-- TODO(CCM-108): Replace with client copy — eligibility section -->
  <nc-base-section color="faded">
    <div class="eligibility-panel | switcher">
      <div>
        <h2>Who Should Apply</h2>
      </div>
      <div class="stack" style="--_stack-space: var(--space-2xs)">
        <p>[PLACEHOLDER] We welcome applications from nonprofits, academic institutions,
           startups, and development organisations working to build or strengthen
           data commons for responsible AI.</p>
        <h3 class="margin-top:s">Eligibility Criteria</h3>
        <ul>
          <li>[PLACEHOLDER] Must be affiliated with an established organisation capable of managing funds</li>
          <li>[PLACEHOLDER] Project must focus on data commons that support responsible AI development</li>
          <li>[PLACEHOLDER] Must demonstrate capacity to implement over 12 months</li>
          <li>[PLACEHOLDER] Government entities may not apply as lead applicants</li>
        </ul>
      </div>
    </div>
  </nc-base-section>

  <nc-timeline :timeline="incubatorTimeline" title="Timeline" subtitle="Key dates for the 2026 Incubator:" />

  <!-- TODO(CCM-108): Replace with client copy — application CTA -->
  <nc-base-section>
    <div class="cta-panel" style="border-radius: var(--border-radius-m);">
      <div class="stack" style="text-align: center; max-width: 40rem; margin: 0 auto;">
        <h2>Ready to Apply?</h2>
        <p>[PLACEHOLDER] Submit your application by [DATE TBD]. Selected teams will be
           notified by [DATE TBD] and the programme begins in [MONTH TBD] 2026.</p>
        <nc-button disabled color="primary" variant="primary">Apply Now (Coming Soon)</nc-button>
      </div>
    </div>
  </nc-base-section>

  <nc-base-section color="faded" size="l" id="judges">
    <h2 class="h2 color:base-color margin-bottom:l">Judges</h2>
    <nc-judges-grid />
    <h2 class="h2 color:base-color margin-block:l">International Observer</h2>
    <nc-observers-grid />
  </nc-base-section>

  <!--<nc-blog-section id="blog" :posts="blogposts" />-->
</template>

<script setup>
// TODO(CCM-108): Replace placeholder dates with confirmed dates
const incubatorTimeline = [
  { date: '2026-03-01T00:00:00-05:00', event: '[PLACEHOLDER] Applications open' },
  { date: '2026-05-01T00:00:00-04:00', event: '[PLACEHOLDER] Applications close' },
  { date: '2026-06-15T00:00:00-04:00', event: '[PLACEHOLDER] Cohort announced' },
  { date: '2026-09-01T00:00:00-04:00', event: '[PLACEHOLDER] Programme begins' },
]
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

.section-bg {
  background-image: url('/assets/bg-prize.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.switcher {
  --_switcher-space: var(--space-s);
}

.offer-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-s);
}

.offer-card {
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

.eligibility-panel {
  padding: var(--space-l-2xl);
}

.cta-panel {
  padding: var(--space-l-2xl);
  color: var(--white-color);
  background-color: var(--base-color);
  border-radius: var(--border-radius-m);

  :deep(svg path) {
    stroke: var(--white-color);
  }
}

.hero__announcement {
  text-align: left !important;
  padding: var(--space-m) var(--space-l);

  * {
    margin-block: 0;
  }

  h3 {
    font-size: var(--size-0);
    font-weight: 800;
    color: var(--base-color);
    text-transform: uppercase;
  }

  h2 {
    font-size: var(--size-2);
    font-weight: 300;
    color: var(--base-color);
  }

  p {
    font-size: var(--size-0);
    font-weight: 300;
    color: var(--base-color);
    margin-block: var(--space-xs);
  }
}
</style>
