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

  <nc-base-section>
    <h2>Call for Proposals: Data Commons for Indigenous Languages and Cultures</h2>
    <p>The Open Data Policy Lab invites changemakers around the world to join us in developing data commons for Indigenous languages and cultural preservation in the AI era.</p>
    <nc-button to="/incubator/2026/application" color="base" variant="primary">Apply Now</nc-button>
  </nc-base-section>

  <nc-base-section color="faded">
    <h2>Join Our Informational Webinars</h2>
    <p>Interested in applying for the Incubator? Join one of our informational webinars for more information about the application process and an open Q&A.</p>
    <nc-button to="/incubator/2026/webinar" color="base" variant="primary">Sign Up</nc-button>
  </nc-base-section>

  <nc-base-section>
    <h2>Why the Incubator?</h2>
    <div class="stack">
      <p>AI models need access to diverse, high-quality datasets so they do not reinforce bias, deepen inequality, and return less accurate, more imprecise results. Yet, access to data remains fragmented and siloed.</p>
      <p>Data commons offer a solution by providing the critical infrastructure needed for responsible AI development. They pool diverse, high quality datasets from multiple sectors that are then managed through participatory governance.</p>
      <p>The Incubator will help transform concepts into viable, sustainable models. It will support data commons proposals by delivering training, mentorship, and direct connections with funders.</p>
    </div>
  </nc-base-section>

  <nc-base-section color="faded">
    <h2>Programmatic Offerings</h2>
    <div class="stack">
      <p>The Incubator is a structured program designed to support data leaders in setting up a data commons. It will include an in-person kickoff event to set stage, virtual programming and mentorship, and a final showcase.</p>
      <p>Throughout the programming, participants will:</p>
      <ul>
        <li>Design and implement accountable and context-specific data governance frameworks</li>
        <li>Build AI-ready datasets grounded in community consent and social license</li>
        <li>Access technical infrastructure and expertise</li>
        <li>Connect with sustainable funding pathways</li>
      </ul>
    </div>
  </nc-base-section>

  <nc-base-section>
    <h2>Call for Proposals: Data Commons for Indigenous Languages and Cultures</h2>
    <p>The Open Data Policy Lab invites changemakers around the world to join us in developing data commons for Indigenous languages and cultures.</p>
    <nc-button to="/incubator/2026/application" color="base" variant="primary">Apply Now</nc-button>
  </nc-base-section>

  <nc-base-section color="faded">
    <div class="two-column">
      <div class="cta-link-panel | stack">
        <h2>Helpful Tips</h2>
        <p>The Open Data Policy Lab has several resources and examples that can be used to support the development of your concept note.</p>
        <nc-button to="/resources" color="base" variant="primary">View Resources</nc-button>
      </div>
      <div class="cta-link-panel | stack">
        <h2>FAQ</h2>
        <p>Have questions about the Incubator? Check out our FAQ page for all the answers you need to get started!</p>
        <nc-button to="/faq" color="base" variant="primary">Read More</nc-button>
      </div>
    </div>
  </nc-base-section>
</template>

<script setup>
useHead({
  title: 'New Commons Incubator 2026 | New Commons',
})
useSeoMeta({
  description: 'The New Commons Incubator is a global effort led by the Open Data Policy Lab that aims to unlock data commons for public-interest AI.',
})
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

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.cta-link-panel {
  padding: var(--space-l-2xl);
  border: 1px solid var(--black-color-10-tint);
  border-radius: var(--border-radius-m);
}
</style>
