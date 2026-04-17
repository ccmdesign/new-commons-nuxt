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

  <nc-call-for-proposals
    id="call-for-proposals"
    tagline='The Open Data Policy Lab invites changemakers around the world to join us and <a href="/incubator/indigenous-languages#steering-committee">our steering committee of Indigenous data experts</a> in developing data commons for Indigenous languages and cultures.'
  >
    <template #secondary>
      <h3>Join Our Informational Webinars</h3>
      <p>Interested in applying for the Incubator for Indigenous Languages and Cultures? Join our informational webinars for more information about the application process and an open Q&amp;A.</p>
      <nc-button to="/incubator/2026/webinar" color="primary" variant="primary">Sign Up</nc-button>
    </template>
  </nc-call-for-proposals>

  <nc-base-section id="definition" size="l">
    <div class="definition">
      <div class="definition__entry">
        <h2 class="definition__word">New Commons</h2>
        <p class="definition__meta">
          <span class="definition__pronunciation">/noo ˈkɒmənz/</span>
          <span class="definition__pos">noun</span>
        </p>
      </div>
      <blockquote class="definition__meaning">
        <p>“Collaboratively governed data ecosystems designed to pool and provide responsible access to diverse, high-quality datasets from one or multiple sectors to enable the development and deployment of generative AI applications that address public interest challenges”</p>
      </blockquote>
    </div>
  </nc-base-section>

  <nc-base-section color="faded" size="l">
    <nc-banner
      title="FAQ"
      description="Have questions about the Incubator? Check out our FAQ page for all the answers you need to get started!"
      to="/faq"
    />
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

  <nc-resource-grid
    id="resources-section"
    :resources="resources"
    tagline="Tools, methods, and examples of data commons in the AI era."
    color="faded"
  />

  <nc-blog-section id="blog" :posts="blogposts" />
</template>

<script setup>
const initiatives = useInitiatives()

const { data: blogposts } = await useAsyncData('blogposts', () =>
  queryCollection('blogposts').order('date', 'DESC').limit(3).all()
)

const { data: resources } = await useAsyncData('homepage-resources', () =>
  queryCollection('resources').order('sort', 'ASC').limit(3).all()
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

.initiatives-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--base-gutter);
}

.definition {
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 2fr;
  gap: var(--space-xl);
  align-items: start;
  background-color: var(--base-color-05-tint);
  border: 1px solid var(--base-color-10-tint);
  border-radius: var(--border-radius-l);
  padding: var(--space-xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-m);
    padding: var(--space-l);
  }
}

.definition__word {
  font-size: var(--size-3);
  font-weight: 700;
  line-height: 1;
  margin: 0;
}

.definition__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-xs);
  margin-top: var(--space-2xs);
  color: var(--base-color-70-tint);
  font-size: var(--size-0);
}

.definition__pronunciation {
  font-family: Georgia, 'Times New Roman', serif;
}

.definition__pos {
  font-style: italic;
}

.definition__pos::before {
  content: '·';
  margin-right: var(--space-xs);
  font-style: normal;
}

.definition__meaning {
  margin: 0;
  border: none;
  padding: 0;

  p {
    font-size: var(--size-1);
    line-height: 1.4;
    font-weight: 300;
    margin: 0;
  }
}

@keyframes horizontal {
  0% { translate: 0%; }
  25% { translate: 2%; }
  50% { translate: 0%; }
  75% { translate: -2%; }
  100% { translate: 0%; }
}
</style>
