<template>
  <nc-hero>
    <div class="hero__content">
      <div class="panel">
        <p class="hero__brow">The New Commons Incubator</p>
        <h1>Building a Shared Digital Future</h1>
        <p>The New Commons Incubator is a programme run by the Open Data Policy Lab that
           supports teams building and sustaining data commons for responsible AI development.
           Through funding, mentorship, and technical resources, we help turn promising ideas
           into sustainable shared data ecosystems that serve the public good.</p>
      </div>
    </div>
    <nc-announcement color="primary" class="hero__announcement">
      <div class="switcher">
        <div style="flex: 3;">
          <h2>Explore the 2025 New Commons Challenge</h2>
          <p>See the winning data commons and honorary distinctions from the inaugural Challenge.</p>
        </div>
        <nc-button class="hero__announcement-button" to="/the-2025-challenge" color="primary" variant="primary" style="align-self: center;">The 2025 Challenge</nc-button>
      </div>
    </nc-announcement>
  </nc-hero>

  <!-- TODO: [CCM-127] Add Call for Proposals section when application form URL is available -->
  <!-- TODO: [CCM-127] Add Webinars section when webinar signup URL is available -->

  <nc-base-section>
    <h2>Why the Incubator?</h2>
    <div class="switcher">
      <div class="stack">
        <p>As artificial intelligence reshapes economies and societies, the data that powers
           it must be governed responsibly. Data commons offer a way to collectively manage
           shared data resources so that AI development serves broad public interests rather
           than narrow ones.</p>
        <p>The New Commons Incubator builds on the success of the 2025 New Commons Challenge,
           which demonstrated the global demand for support in creating and sustaining data
           commons. The Incubator takes a deeper, hands-on approach, working closely with
           selected teams to address the technical, governance, and sustainability challenges
           that come with building shared data infrastructure.</p>
        <p>By supporting diverse teams around the world, the Incubator aims to grow an
           ecosystem of data commons that can serve as the foundation for responsible AI
           across sectors and regions.</p>
      </div>
    </div>
  </nc-base-section>

  <nc-base-section color="faded">
    <h2>Programmatic Offerings</h2>
    <div class="switcher">
      <div class="stack">
        <p>The Incubator provides selected teams with a comprehensive package of support
           designed to help them move from concept to sustainable implementation. Over the
           course of the programme, participants receive:</p>
        <ul>
          <li><strong>Funding</strong> — Grant funding to support the development or enhancement of data commons projects</li>
          <li><strong>Mentorship &amp; Guidance</strong> — Regular access to experts in data governance, AI ethics, and commons management from the Open Data Policy Lab network</li>
          <li><strong>Technical Support</strong> — Hands-on assistance with data infrastructure, interoperability standards, and platform development</li>
          <li><strong>Network Access</strong> — Connection to the Open Data Policy Lab's global network of policymakers, technologists, and data practitioners</li>
          <!-- TODO: [CCM-127] Update programme duration when confirmed (currently TBD) -->
        </ul>
      </div>
    </div>
  </nc-base-section>

  <!-- TODO: [CCM-127] Add Call for Proposals repeat section when application form URL is available -->

  <nc-base-section>
    <div class="cta-links | stack">
      <div class="cta-link-panel">
        <h2>Helpful Tips</h2>
        <p>Explore our resources for guidance on data commons, governance frameworks, and best practices for responsible AI development.</p>
        <nc-button to="/resources" color="base" variant="primary">View Resources</nc-button>
      </div>
      <div class="cta-link-panel">
        <h2>Have Questions?</h2>
        <p>Check out our FAQ page for answers about the Incubator, eligibility, application process, and more.</p>
        <nc-button to="/faq" color="base" variant="primary">Read the FAQ</nc-button>
      </div>
    </div>
  </nc-base-section>
</template>

<script setup>
useHead({
  title: 'New Commons Incubator 2026 | New Commons',
})
useSeoMeta({
  description: 'The New Commons Incubator supports teams building data commons for responsible AI through funding, mentorship, and technical resources.',
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

.switcher {
  --_switcher-space: var(--space-s);
}

.cta-links {
  --_stack-space: var(--space-l);
}

.cta-link-panel {
  padding: var(--space-l-2xl);
  border: 1px solid var(--black-color-10-tint);
  border-radius: var(--border-radius-m);
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
