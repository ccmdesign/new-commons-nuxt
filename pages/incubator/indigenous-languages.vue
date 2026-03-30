<template>
  <!-- Panel 1: Hero -->
  <nc-hero>
    <div class="hero__content">
      <div class="panel">
        <p class="hero__brow">The New Commons Incubator</p>
        <h1>Indigenous Languages</h1>
        <!-- TODO(CCM-129): Replace placeholder description with final copy -->
        <p>Supporting the development of data commons that preserve and promote
           indigenous languages in the age of AI. This initiative brings together
           language communities, technologists, and researchers to build shared
           data resources that ensure indigenous languages thrive in digital spaces.</p>
        <!-- TODO(CCM-129): Update Apply Now link when application form URL is available -->
        <nc-button to="#apply" color="base" variant="primary">Apply Now</nc-button>
      </div>
    </div>
    <!-- Panel 6: Webinar CTA (nested in hero as announcement) -->
    <!-- TODO(CCM-129): Update webinar URL and date when available -->
    <nc-announcement color="primary" class="hero__announcement">
      <div class="switcher">
        <div style="flex: 3;">
          <h3>Upcoming Webinar</h3>
          <h2>Learn About the Indigenous Languages Initiative</h2>
          <p>Join us for an informational webinar about the programme, eligibility, and how to apply.</p>
        </div>
        <!-- TODO(CCM-129): Update webinar signup link -->
        <nc-button class="hero__announcement-button" to="#" color="primary" variant="primary" style="align-self: center;">Register</nc-button>
      </div>
    </nc-announcement>
  </nc-hero>

  <!-- Panel 2: Why Section -->
  <nc-base-section>
    <h2>Why Indigenous Languages?</h2>
    <div class="switcher">
      <div class="stack">
        <!-- TODO(CCM-129): Replace placeholder copy with final content -->
        <p>Indigenous languages carry centuries of knowledge, cultural identity, and unique
           perspectives on the world. Yet many of these languages are underrepresented in
           digital spaces and AI systems, risking further marginalization as technology
           becomes central to daily life.</p>
        <p>Data commons for indigenous languages can help communities maintain control over
           their linguistic data while making it available for AI applications that serve
           their needs — from language learning tools to speech recognition systems that
           work in their mother tongues.</p>
        <p>This initiative supports teams working to build, enhance, or sustain shared data
           resources that preserve and promote indigenous languages, ensuring these
           communities have a voice in shaping the AI-powered future.</p>
      </div>
    </div>
  </nc-base-section>

  <!-- Panel 3: Programmatic Offerings -->
  <nc-base-section color="faded">
    <h2>Programmatic Offerings</h2>
    <div class="switcher">
      <div class="stack">
        <!-- TODO(CCM-129): Update offerings list with final programme details -->
        <p>Selected teams will receive a comprehensive package of support tailored to
           the unique challenges of building indigenous language data commons:</p>
        <ul>
          <li><strong>Funding</strong> — Grant funding to support the development or enhancement of indigenous language data commons</li>
          <li><strong>Mentorship &amp; Guidance</strong> — Access to experts in computational linguistics, data governance, and indigenous language preservation</li>
          <li><strong>Technical Support</strong> — Assistance with data collection methodologies, annotation frameworks, and platform development</li>
          <li><strong>Community Engagement</strong> — Support for meaningful engagement with language communities throughout the project lifecycle</li>
          <li><strong>Network Access</strong> — Connection to a global network of indigenous language advocates, technologists, and policymakers</li>
        </ul>
      </div>
      <!-- TODO(CCM-129): Add partner logos when assets are available -->
      <div class="partner-logos">
        <p class="partner-logos__heading">Programme Partners</p>
        <!-- TODO(CCM-129): Replace placeholder with actual partner logos -->
        <p class="partner-logos__placeholder">Partner logos coming soon.</p>
      </div>
    </div>
  </nc-base-section>

  <!-- Panel 4: Steering Committee -->
  <nc-base-section>
    <h2 class="text-align:center">Steering Committee</h2>
    <!-- TODO(CCM-129): Replace placeholder steering committee data with actual members -->
    <p class="text-align:center">Meet the experts guiding the Indigenous Languages initiative.</p>
    <nc-people-grid
      :collection="steeringCommittee"
      base-path="/incubator/indigenous-languages"
      image-base-path="/assets/steering-committee/"
    />
  </nc-base-section>

  <!-- Panel 5: How to Apply -->
  <nc-base-section id="apply" color="faded">
    <h2>How to Apply</h2>
    <div class="switcher">
      <div class="stack">
        <!-- TODO(CCM-129): Replace placeholder application steps with final content -->
        <p>We welcome applications from teams around the world working on indigenous
           language data commons. Here is how to get started:</p>
        <ol>
          <li><strong>Review the eligibility criteria</strong> — Ensure your project aligns with the initiative's goals and requirements.</li>
          <li><strong>Prepare your application</strong> — Gather information about your team, project, and community engagement approach.</li>
          <li><strong>Submit your application</strong> — Complete the online application form before the deadline.</li>
          <li><strong>Await review</strong> — Applications will be reviewed by the Steering Committee and programme staff.</li>
        </ol>
        <!-- TODO(CCM-129): Update Apply Now link when application form URL is available -->
        <nc-button to="#" color="base" variant="primary">Apply Now</nc-button>
      </div>
    </div>
  </nc-base-section>

  <!-- Panel 7: Timeline -->
  <!-- TODO(CCM-129): Update timeline dates when confirmed -->
  <nc-timeline
    :timeline="timelineData"
    title="Timeline"
    subtitle="Key dates for the Indigenous Languages initiative"
  />

  <!-- Panel 8: FAQ CTA -->
  <nc-cta id="cta" :single-column="true">
    <div class="cta-panel" width="narrow">
      <div class="panel-header">
        <h2 class="padding-bottom:s">FAQs</h2>
        <div class="stack">
          <div>
            <p>Have questions about the Indigenous Languages initiative?</p>
            <p>Check out our FAQ page for answers about the programme, eligibility, and how to apply.</p>
          </div>
          <NuxtLink to="/faq" class="button" color="white" variant="link">Read More <nc-arrow-link-up /></NuxtLink>
        </div>
      </div>
    </div>
  </nc-cta>
</template>

<script setup>
useHead({
  title: 'Indigenous Languages | New Commons Incubator',
})
useSeoMeta({
  description: 'The New Commons Incubator supports the development of data commons that preserve and promote indigenous languages in the age of AI.',
})

const steeringCommittee = useSteeringCommittee()

// TODO(CCM-129): Update timeline dates when confirmed
const timelineData = [
  { date: '2026-06-01T09:00:00-07:00', event: 'Applications Open' },
  { date: '2026-07-15T17:00:00-07:00', event: 'Application Deadline' },
  { date: '2026-08-01T09:00:00-07:00', event: 'Cohort Announced' },
  { date: '2026-09-01T09:00:00-07:00', event: 'Programme Begins' },
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

.switcher {
  --_switcher-space: var(--space-s);
}

.partner-logos {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.partner-logos__heading {
  font-weight: 600;
  font-size: var(--size-0);
  text-transform: uppercase;
  color: var(--primary-color);
}

.partner-logos__placeholder {
  font-size: var(--size--1);
  color: var(--base-color-70-tint);
  font-style: italic;
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

#cta .cta-panel {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

#cta .cta-panel .panel-header {
  display: flex;
  flex-direction: column;
  text-align: left;
  color: var(--white-color);
  background: url('/assets/patterns/squares.svg') left top no-repeat, #0E2F40;
  background-size: contain;
  border-radius: 8px;
  padding: var(--space-2xl-3xl);
  :deep(svg path) {
    stroke: var(--white-color);
  }
  @media (min-width: 1120px) {
    flex-direction: row;
    align-items: center;
  }
}

#cta .cta-panel .panel-header > * {
  flex: 1;
}
</style>
