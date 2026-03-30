<template>
  <nc-hero id="hero">
    <div class="hero__content">
      <div class="panel | stack">
        <h1>The New Commons Incubator</h1>
        <p>The New Commons initiative supports teams building data commons for responsible AI.
           Through the Incubator programme, we provide funding, mentorship, and technical
           resources to help turn promising ideas into sustainable shared data ecosystems
           that serve the public good.</p>
        <nc-button to="/incubator/2026" color="base" variant="primary">About the Incubator</nc-button>
      </div>
      <div class="hero__image-div">

        <img
          src="/assets/patterns/hero.jpg"
          alt="Abstract geometric pattern representing collaborative data commons" />
          <nc-minimal-logo />
      </div>
    </div>
    <nc-announcement color="primary" class="hero__announcement">
      <div class="switcher" style="">
        <div style="flex: 3;">
          <h3>New Commons Incubator</h3>
          <h2>Supporting Data Commons for Responsible AI</h2>
          <p>Learn about the Incubator programme and how to get involved in building shared data ecosystems.</p>
          <NuxtLink to="/the-2025-challenge" style="font-size: var(--size-0); font-weight: 300; text-decoration: underline;">View the 2025 Challenge &rarr;</NuxtLink>
        </div>
        <nc-button class="hero__announcement-button" to="/incubator/2026" color="primary" variant="primary" style="align-self: center;">Learn More</nc-button>
      </div>
    </nc-announcement>
  </nc-hero>

  <!-- TODO: [CCM-127] Add Call for Proposals section (Panel 2) when application form URL is available -->
  <!-- TODO: [CCM-127] Add Webinars section (Panel 3) when webinar signup URL is available -->

  <nc-cta id="cta" :single-column="true">
    <div class="cta-panel"
      width="narrow">
      <div class="panel-header">
        <h2 class="padding-bottom:s">FAQs</h2>
        <div class="stack">
          <div>
            <p>Have questions about the New Commons Incubator?</p>
            <p>Check out our FAQ page for answers about the programme, eligibility, and how to apply.</p>
          </div>
          <NuxtLink to="/faq" class="button" color="white" variant="link">Read More <nc-arrow-link-up /></NuxtLink>
        </div>
      </div>
    </div>
  </nc-cta>

  <nc-base-section id="initiatives">
    <h2>Initiatives</h2>
    <div class="initiatives-cards">
      <nc-initiative-card
        v-for="initiative in initiatives"
        :key="initiative.title"
        v-bind="initiative"
      />
    </div>
  </nc-base-section>

  <nc-base-section id="resources-section" color="faded">
    <h2>Resources</h2>
    <div class="grid resource-grid">
      <nc-resource-card
        v-for="resource in resources"
        :key="resource.slug"
        :content="resource"
      />
    </div>
  </nc-base-section>

  <nc-blog-section id="blog" :posts="blogposts" />

</template>

<script setup>

const initiatives = [
  {
    title: 'The 2025 Challenge',
    description: 'The inaugural New Commons Challenge awarded two $100,000 prizes to teams building data commons for responsible AI development.',
    status: 'Completed',
    to: '/the-2025-challenge',
    image: '/assets/patterns/hero.jpg',
  },
  {
    title: 'Indigenous Languages',
    description: 'Supporting the development of data commons that preserve and promote indigenous languages in the age of AI.',
    status: 'Coming Soon',
    to: '/incubator/indigenous-languages',
    image: '/assets/patterns/hero.jpg',
  },
]

const { data: blogposts } = await useAsyncData('blogposts', () => queryCollection('blogposts').limit(3).all())

const { data: resources } = await useAsyncData('homepage-resources', () =>
  queryCollection('resources').limit(3).all()
)

</script>

<style scoped lang="scss">

.hero__image-div {
  @media (max-width: 1120px) {
    display: none;
  }

  overflow: hidden;
  position: relative;
  :deep(.minimal-logo) {
    position: absolute;
    top: -28%;
    left: 15%;
    width: 133%;
    animation-duration: 10s;
    animation-name: horizontal;
    animation-iteration-count: infinite;
    path {
      backdrop-filter: blur(32px);
      fill: var(--white-color);
      fill-opacity: 0.4;
    }
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

.initiatives-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--base-gutter);
}

.resource-grid {
  --_grid-min-width: 300px;
}

@keyframes horizontal{
  0% {
    translate: 0%;
  }

  25%{
    translate: 2%;
  }

  50%{
    translate: 0%;
  }

  75%{
    translate: -2%;
  }

  100% {
    translate: 0%;
  }
}
</style>
