<template>
  <nc-hero>
    <div class="hero__content">
      <div class="panel | stack">
        <p class="hero__brow">BUILDING A SHARED DIGITAL FUTURE</p>
        <h1>The New Commons Incubator</h1>
        <p>The Incubator is a global effort led by the Open Data Policy Lab that aims to unlock data commons for public-interest AI.</p>
        <p>The Incubator addresses a critical issue: the limited access to diverse and high-quality datasets, which is essential for AI to reach its full potential. By creating and improving data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets, the gap in AI development can be filled.</p>
        <p>Through structured programming, the Incubator will develop a pipeline of trusted, community-governed data commons that enable responsible AI development while safeguarding data rights, context, and community agency.</p>
      </div>
    </div>
  </nc-hero>

  <nc-call-for-proposals>
    <template #secondary>
      <h3>Join Our Informational Webinars</h3>
      <p>Interested in applying for the Incubator? Join one of our informational webinars for more information about the application process and an open Q&amp;A.</p>
      <nc-button to="/incubator/2026/webinar" color="primary" variant="primary">Sign Up</nc-button>
    </template>
  </nc-call-for-proposals>

  <nc-base-section size="l">
    <div class="why-incubator">
      <div class="why-incubator__image">
        <img
          src="/images/google-deepmind-lISkvdgfLEk-unsplash.jpg"
          alt="Abstract 3D data landscape visualization by Google DeepMind" />
      </div>
      <div class="stack">
        <h2>Why the Incubator?</h2>
        <p>AI models need access to diverse, high-quality datasets so they do not reinforce bias, deepen inequality, and return less accurate, more imprecise results. Yet, access to data remains fragmented and siloed.</p>
        <p>Data commons offer a solution by providing the critical infrastructure needed for responsible AI development. They pool diverse, high quality datasets from multiple sectors that are then managed through participatory governance.</p>
        <p>The Incubator will help transform concepts into viable, sustainable models. It will support data commons proposals by delivering training, mentorship, and direct connections with funders.</p>
      </div>
    </div>
  </nc-base-section>

  <nc-base-section color="faded" size="l">
    <div class="programmatic-offerings">
      <div class="programmatic-offerings__text | stack">
        <h2>Programmatic Offerings</h2>
        <p>The Incubator is a structured program designed to support data leaders in setting up a data commons. It will include an in-person kickoff event to set stage, virtual programming and mentorship, and a final showcase.</p>
      </div>
      <div class="programmatic-offerings__list | stack">
        <h3>What Participants Will Gain</h3>
        <ul>
          <li>
            <Icon name="ph:scales" />
            <span>Design and implement accountable and context-specific data governance frameworks</span>
          </li>
          <li>
            <Icon name="ph:handshake" />
            <span>Build AI-ready datasets grounded in community consent and social license</span>
          </li>
          <li>
            <Icon name="ph:wrench" />
            <span>Access technical infrastructure and expertise</span>
          </li>
          <li>
            <Icon name="ph:path" />
            <span>Connect with sustainable funding pathways</span>
          </li>
        </ul>
      </div>
    </div>
  </nc-base-section>

  <nc-resource-grid
    :resources="resources"
    tagline="Tools, methods, and examples of data commons in the AI era."
    color="faded"
  />

  <nc-base-section size="l">
    <nc-banner
      title="FAQ"
      description="Have questions about the Incubator? Check out our FAQ page for all the answers you need to get started!"
      to="/faq"
    />
  </nc-base-section>
</template>

<script setup>
useHead({
  title: 'New Commons Incubator 2026 | New Commons',
})
useSeoMeta({
  description: 'The New Commons Incubator is a global effort led by the Open Data Policy Lab that aims to unlock data commons for public-interest AI.',
})

const { data: resources } = await useAsyncData('incubator-resources', () =>
  queryCollection('resources').limit(3).all()
)
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

.why-incubator {
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

.programmatic-offerings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
