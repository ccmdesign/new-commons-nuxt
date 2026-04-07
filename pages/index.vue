<template>
  <nc-hero id="hero">
    <div class="hero__content">
      <div class="panel | stack">
        <h1>New Commons Incubator</h1>
        <p>The New Commons Incubator seeks to strengthen the pipeline of data commons for the AI era. Through structured programming, we aim to unlock the next generation of data commons and make the data ecosystem more sustainable and scalable.</p>
        <nc-button to="/incubator/2026" color="base" variant="primary">About the Incubator</nc-button>
      </div>
      <div class="hero__image-div">
        <img
          src="/assets/patterns/hero.jpg"
          alt="Abstract geometric pattern representing collaborative data commons" />
        <nc-minimal-logo />
      </div>
    </div>
  </nc-hero>

  <nc-call-for-proposals id="call-for-proposals">
    <template #secondary>
      <h3>Join Our Informational Webinars</h3>
      <p>Interested in applying for the Incubator? Join one of our informational webinars for more information about the application process and an open Q&amp;A.</p>
      <nc-button to="/incubator/2026/webinar" color="primary" variant="primary">Sign Up</nc-button>
    </template>
  </nc-call-for-proposals>

  <nc-base-section color="faded" size="l">
    <div class="two-column">
      <div class="stack">
        <h2>Join Our Informational Webinars</h2>
        <p>Interested in applying for the Incubator for Indigenous Languages and Cultures? Join our informational webinars for more information about the application process and an open Q&A.</p>
        <nc-button to="/incubator/2026/webinar" color="base" variant="primary">Sign Up</nc-button>
      </div>
      <div class="stack">
        <h2>FAQ</h2>
        <p>Have questions about the Incubator? Check out our FAQ page for all the answers you need to get started!</p>
        <nc-button to="/faq" color="base" variant="primary">Read More</nc-button>
      </div>
    </div>
  </nc-base-section>

  <nc-base-section id="initiatives" size="l">
    <div class="stack">
      <h2>New Commons Initiatives</h2>
      <div class="initiatives-cards">
        <nc-initiative-card
          v-for="initiative in initiatives"
          :key="initiative.title"
          v-bind="initiative"
        />
      </div>
    </div>
  </nc-base-section>

  <nc-base-section v-if="resources?.length" id="resources-section" color="faded" size="l">
    <div class="stack">
      <h2>Resources</h2>
      <p>Tools, methods, and examples of data commons in the AI era.</p>
      <div class="grid resource-grid">
        <nc-resource-card
          v-for="resource in resources"
          :key="resource.slug"
          :content="resource"
        />
      </div>
    </div>
  </nc-base-section>

  <nc-blog-section id="blog" :posts="blogposts" />
</template>

<script setup>
const initiatives = useInitiatives()

const { data: blogposts } = await useAsyncData('blogposts', () =>
  queryCollection('blogposts').order('date', 'DESC').limit(3).all()
)

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

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.initiatives-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--base-gutter);
}

.resource-grid {
  --_grid-min-width: 300px;
}

@keyframes horizontal {
  0% { translate: 0%; }
  25% { translate: 2%; }
  50% { translate: 0%; }
  75% { translate: -2%; }
  100% { translate: 0%; }
}
</style>
