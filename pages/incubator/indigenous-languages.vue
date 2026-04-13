<template>
  <nc-hero>
    <div class="hero__content">
      <div class="panel | stack">
        <p class="hero__brow">New Commons Incubator</p>
        <h1>Indigenous Languages and Cultures</h1>
        <p>A structured program for developing data commons for Indigenous languages and cultures.</p>
      </div>
    </div>
  </nc-hero>

  <nc-call-for-proposals
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
        <p>This represents both a technical and governance breakdown. What's needed is a new institutional approach.</p>
        <p>The New Commons Incubator for Indigenous Languages and Cultures advances a data commons model that enables responsible access to high-quality data while ensuring any access and use remains aligned with Indigenous values and expectations. It shifts the framework from extraction by outside parties to collective stewardship led by Indigenous communities themselves, ensuring that data is governed, shared, and used on community-defined terms.</p>
      </div>
      <div class="why-section__image">
        <img
          src="/images/indigenous-language-incubator.jpg"
          alt="An inukshuk of balanced stones against a calm blue lake horizon"
        />
      </div>
    </div>
  </nc-base-section>

  <nc-base-section color="faded" size="l">
    <div class="programmatic-offerings">
      <div class="programmatic-offerings__text | stack">
        <h2>Programmatic Offerings</h2>
        <p>Through a structured program, we will support selected initiatives in transforming their concepts into operational models. It includes an in-person kickoff event, virtual programming and mentorship, and a final showcase where participants present their data commons to funders.</p>
        <p>This initiative is powered by The GovLab through its Open Data Policy Lab, Microsoft, and UNESCO in alignment with the <a href="https://www.unesco.org/en/decades/indigenous-languages" target="_blank" rel="noopener noreferrer">International Decade of Indigenous Languages (IDIL)</a>.</p>
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

  <nc-resource-grid
    :resources="resources"
    tagline="Tools, methods, and examples of data commons in the AI era."
    color="faded"
  />
</template>

<script setup>
useHead({
  title: 'Indigenous Languages and Cultures | New Commons Incubator',
})
useSeoMeta({
  description: 'A structured program for developing data commons for Indigenous languages and cultures in the AI era.',
})

const steeringCommittee = useSteeringCommittee()

const { data: resources } = await useAsyncData('indigenous-languages-resources', () =>
  queryCollection('resources').limit(3).all()
)

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

.prose {
  max-width: 80ch;
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
