<template>
  <nc-hero>
    <div class="hero__content">
      <div class="panel | stack">
        <p class="hero__brow">New Commons Incubator</p>
        <h1>Indigenous Languages and Cultures</h1>
        <p>A structured program for developing data commons for Indigenous languages and cultures</p>
        <nc-button to="/incubator/2026/application" color="base" variant="primary">Apply Now</nc-button>
      </div>
    </div>
  </nc-hero>

  <nc-base-section>
    <h2>Why?</h2>
    <div class="stack">
      <p>Indigenous languages face many pressures in the age of AI:</p>
      <ul>
        <li>When left out, existing digital marginalization and inequities deepen.</li>
        <li>When included, data is often extracted without consent or benefit.</li>
        <li>And even well-intentioned efforts frequently strip away the cultural context that gives these languages meaning.</li>
      </ul>
      <p>This represents both a technical and governance breakdown. What's needed is a new institutional approach.</p>
      <p>The New Commons Incubator for Indigenous Languages and Cultures advances a data commons model that enables responsible access to high-quality data while ensuring any access and use remains aligned with Indigenous values and expectations. It shifts the framework from extraction by outside parties to collective stewardship led by Indigenous communities themselves, ensuring that data is governed, shared, and used on community-defined terms.</p>
    </div>
  </nc-base-section>

  <nc-base-section color="faded">
    <h2>Programmatic Offerings</h2>
    <div class="stack">
      <p>Through a structured program, we will support selected initiatives in transforming their concepts into operational models. It will include an in-person kickoff event to set stage, virtual programming and mentorship, and a final showcase where participants will present their data commons to funders.</p>
      <ul>
        <li>Design governance frameworks grounded in Indigenous data sovereignty and social license</li>
        <li>Build AI-ready datasets rooted in consent, context, and community priorities</li>
        <li>Access technical infrastructure and expertise</li>
        <li>Connect to funding and global ecosystems</li>
      </ul>
      <p>This initiative is powered by The GovLab through its Open Data Policy Lab, Microsoft, and UNESCO in alignment with the International Decade of Indigenous Languages (IDIL).</p>
    </div>
  </nc-base-section>

  <nc-base-section>
    <h2 class="text-align:center">Steering Committee</h2>
    <p class="text-align:center">This initiative is supported by a Steering Committee of Indigenous experts and representatives to ensure this work is productive and complementary to existing Indigenous-led efforts. The Steering Committee offers input on all major decisions and the partner organizations aim to ensure their guidance is reflected in all activities.</p>
    <nc-people-grid :collection="steeringCommittee" base-path="/incubator/indigenous-languages" />
  </nc-base-section>

  <nc-base-section color="faded">
    <h2>How to apply?</h2>
    <p>Applicants can submit a 2-page concept note using our application form.</p>
    <nc-button to="/incubator/2026/application" color="base" variant="primary">Apply Now</nc-button>
  </nc-base-section>

  <nc-base-section>
    <h2>Join Our Informational Webinars</h2>
    <p>Interested in applying for the Incubator? Join our webinars for more information about the application process and an open Q&A.</p>
    <nc-button to="/incubator/2026/webinar" color="base" variant="primary">Sign Up</nc-button>
  </nc-base-section>

  <nc-timeline
    :timeline="timelineData"
    title="Timeline"
  />

  <nc-cta id="cta" :single-column="true">
    <div class="cta-panel" width="narrow">
      <div class="panel-header">
        <h2 class="padding-bottom:s">FAQ</h2>
        <div class="stack">
          <p>Have questions about the Incubator for Indigenous Languages and Cultures? Check out our FAQ page for all the answers you need to get started!</p>
          <NuxtLink to="/faq" class="button" color="white" variant="link">Read More <nc-arrow-link-up /></NuxtLink>
        </div>
      </div>
    </div>
  </nc-cta>
</template>

<script setup>
useHead({
  title: 'Indigenous Languages and Cultures | New Commons Incubator',
})
useSeoMeta({
  description: 'A structured program for developing data commons for Indigenous languages and cultures in the AI era.',
})

const steeringCommittee = useSteeringCommittee()

const timelineData = [
  { date: '2026-05-15T09:00:00-04:00', event: 'Applications Open' },
  { date: '2026-05-25T09:00:00-04:00', event: 'Informational Webinar 1' },
  { date: '2026-06-01T09:00:00-04:00', event: 'Informational Webinar 2' },
  { date: '2026-07-10T17:00:00-04:00', event: 'Applications Close' },
  { date: '2026-08-25T09:00:00-04:00', event: 'Cohort Selection' },
  { date: '2026-09-07T09:00:00-04:00', event: 'Cohort Onboarding' },
  { date: '2026-09-14T09:00:00-04:00', event: 'In-Person Kickoff' },
  { date: '2027-02-01T09:00:00-05:00', event: 'Final Showcase' },
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
