<template>
  <nc-hero :show-cfp-banner="false">
    <div class="hero__content">
      <div class="panel | stack">
        <p class="hero__brow">New Commons Incubator</p>
        <h1>Indigenous Languages and Cultures</h1>
        <p>A structured program for developing data commons for Indigenous languages and cultures.</p>
      </div>
    </div>
  </nc-hero>

  <nc-call-for-proposals
    :show-learn-more="false"
    tagline="The Open Data Policy Lab invites advocates for Indigenous communities from around the world to join us in developing data commons for Indigenous languages and cultures."
  >
    <template #secondary>
      <h3>Join Our Informational Webinars</h3>
      <p>Interested in applying for the Incubator? Join our webinars for more information about the application process and an open Q&amp;A.</p>
      <nc-button to="/incubator/2026/webinar" color="primary" variant="primary">Sign Up</nc-button>
    </template>
  </nc-call-for-proposals>

  <nc-base-section size="l">
    <div class="why-section">
      <div class="stack">
        <h2>Why?</h2>
        <p>Indigenous languages face many pressures in the age of AI:</p>
        <ul>
          <li>When left out, existing digital marginalization and inequities deepen.</li>
          <li>When included, data is often extracted without consent or benefit.</li>
          <li>And even well-intentioned efforts frequently strip away the cultural context that gives these languages meaning.</li>
        </ul>
      </div>
      <div class="why-section__image">
        <img
          src="/images/indigenous-language-incubator.jpg"
          alt="An inukshuk of balanced stones against a calm blue lake horizon"
        />
      </div>
    </div>
  </nc-base-section>

  <nc-base-section size="l">
    <div class="our-approach | stack">
      <h2>Our Approach</h2>
      <blockquote class="our-approach__quote">
        <p>This represents both a technical and governance breakdown. What's needed is a <strong>new institutional approach</strong>.</p>
      </blockquote>
      <p class="our-approach__body">The <strong><em>New Commons Incubator for Indigenous Languages and Cultures</em></strong> advances a <a href="https://incubator.opendatapolicylab.org/files/data-commons-for-ai-blueprint.pdf" target="_blank" rel="noopener noreferrer">data commons model</a> that enables responsible access to high-quality data while ensuring any access and use remains aligned with Indigenous values and expectations. It shifts the framework from extraction by outside parties to <strong>collective stewardship led by Indigenous communities themselves</strong>, ensuring that data is governed, shared, and used on community-defined terms.</p>
    </div>
  </nc-base-section>

  <nc-base-section color="faded" size="l">
    <div class="programmatic-offerings">
      <div class="programmatic-offerings__text | stack">
        <h2>Programmatic Offerings</h2>
        <p>Through a structured program, we will support selected initiatives in transforming their concepts into an implementable plan. It will include an in-person kickoff event to set stage, virtual programming and mentorship, and a final showcase where participants will present their data commons to funders.</p>
        <p>This initiative is powered by The GovLab through its Open Data Policy Lab, Microsoft, and UNESCO in alignment with the <a href="https://www.unesco.org/en/decades/indigenous-languages" target="_blank" rel="noopener noreferrer">International Decade of Indigenous Languages (IDIL)</a>.</p>
        <nc-button to="#" color="primary" variant="secondary">View Sample Program</nc-button>
      </div>
      <div class="programmatic-offerings__list | stack">
        <h3>Throughout the programming, participants will:</h3>
        <ul>
          <li>
            <Icon name="ph:scales" />
            <span>Design governance frameworks grounded in <a href="https://blog.thegovlab.org/selected-readings-on-indigenous-data-sovereignty" target="_blank" rel="noopener noreferrer">Indigenous data sovereignty</a> and <a href="https://tools.opendatapolicylab.org/files/Data-Re-Use-Worksheet.pdf" target="_blank" rel="noopener noreferrer">social license</a></span>
          </li>
          <li>
            <Icon name="ph:handshake" />
            <span>Build <a href="https://sverhulst.medium.com/from-fair-to-fair-r-and-fair%C2%B2-making-data-ai-ready-5b25ff05324b" target="_blank" rel="noopener noreferrer">AI-ready datasets</a> rooted in consent, context, and community priorities</span>
          </li>
          <li>
            <Icon name="ph:wrench" />
            <span>Access technical infrastructure and expertise</span>
          </li>
          <li>
            <Icon name="ph:path" />
            <span>Connect to funding and global ecosystems</span>
          </li>
        </ul>
      </div>
    </div>
  </nc-base-section>

  <nc-base-section size="l">
    <div class="stack steering-committee">
      <h2 class="text-align:center">Steering Committee</h2>
      <p class="text-align:center">This initiative is supported by a Steering Committee of Indigenous experts and representatives to ensure this work is productive and complementary to existing Indigenous-led efforts. The Steering Committee offers input on all major decisions and the partner organizations aim to ensure their guidance is reflected in all activities.</p>
      <nc-people-grid :collection="steeringCommittee" base-path="/incubator/indigenous-languages" image-base-path="" />
    </div>
  </nc-base-section>

  <nc-cta single-column>
    <div class="stack how-to-apply">
      <p class="brow">How to Apply</p>
      <h2 class="how-to-apply__heading">Submit your concept note</h2>
      <p class="how-to-apply__tagline">Interested applicants need to submit a 2-page concept note using our application form by <strong>10 July 2026</strong>.</p>
      <nc-button to="/incubator/2026/application" color="primary" variant="primary">Apply Now</nc-button>
    </div>
  </nc-cta>

  <nc-timeline
    :timeline="timelineData"
    title="Timeline"
    first-active
  />

  <nc-base-section size="l">
    <nc-banner
      title="FAQ"
      description="Have questions about the Incubator for Indigenous Languages and Cultures? Check out our FAQ page for all the answers you need to get started!"
      to="/faq"
    />
  </nc-base-section>
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
  { date: '2026-09-15T09:00:00-04:00', event: 'Virtual Incubation Programming (September 2026 – January 2027)' },
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

.prose {
  max-width: 80ch;
}

.our-approach {
  max-width: 72ch;
  margin-inline: auto;

  a {
    text-decoration: underline;
  }
}

.our-approach__quote {
  margin: 0;
  padding: var(--space-s) 0 var(--space-s) var(--space-l);
  border-left: 4px solid var(--primary-color);

  p {
    font-size: var(--size-2);
    line-height: 1.3;
    font-weight: 400;
    margin: 0;
    color: var(--base-color);
  }

  strong {
    font-weight: 700;
    color: var(--primary-color);
  }

  @media (max-width: 640px) {
    padding-left: var(--space-m);

    p {
      font-size: var(--size-1);
    }
  }
}

.our-approach__body {
  font-size: calc(var(--size-0) + 1px);
  line-height: 1.55;
}

.why-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  &__image {
    border-radius: var(--border-radius-l);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}

.steering-committee :deep(.grid) {
  max-width: 48rem;
  margin-inline: auto;
}

.how-to-apply {
  .brow {
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 800;
    font-size: var(--size-0);
    letter-spacing: 0.05em;
  }

  &__heading {
    margin-top: 0;
    font-size: var(--size-3);
    color: var(--white-color);
  }

  &__tagline {
    max-width: 50ch;
  }

  @media (max-width: 920px) {
    &__tagline {
      max-width: 100%;
    }
  }
}

.programmatic-offerings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  a {
    color: var(--link-color);
    font-weight: inherit;
  }

  &__text {
    --_stack-space: var(--space-s);
  }

  &__list {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-s);
    }

    li {
      display: flex;
      align-items: flex-start;
      gap: var(--space-s);
    }

    .icon {
      flex-shrink: 0;
      font-size: 1.5rem;
      color: var(--primary-color);
      margin-top: 0.1em;
    }
  }
}
</style>
