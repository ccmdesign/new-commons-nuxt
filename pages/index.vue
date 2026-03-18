<template>
  <nc-hero id="hero">
    <div class="hero__content">
      <div class="panel | stack">
        <!-- TODO(CCM-108): Replace with client copy — hero headline and description -->
        <h1>New Commons Incubator</h1>
        <p>[PLACEHOLDER] The New Commons Incubator supports teams building data commons
           for responsible AI. Through funding, mentorship, and technical resources, we help
           turn promising ideas into sustainable shared data ecosystems.</p>
        <nc-button el="a" to="/incubator/2026" color="base" variant="primary">Apply to the Incubator</nc-button>
      </div>
      <div class="hero__image-div">

        <img
          src="/assets/patterns/hero.jpg"
          alt="Hero Image" />
          <nc-minimal-logo />
      </div>
    </div>
    <nc-announcement color="primary" class="hero__announcement">
      <!-- TODO(CCM-108): Replace with client copy — announcement bar -->
      <div class="switcher" style="">
        <div style="flex: 3;">
          <h3>Now Accepting Applications</h3>
          <h2>2026 Incubator Cohort</h2>
          <p>[PLACEHOLDER] Apply by [DATE TBD] to join the next cohort of teams building data commons for responsible AI.</p>
          <NuxtLink to="/the-2025-challenge" style="font-size: var(--size-0); font-weight: 300; text-decoration: underline;">View the 2025 Challenge &rarr;</NuxtLink>
        </div>
        <nc-button class="hero__announcement-button" to="/incubator/2026" color="primary" variant="primary" style="align-self: center;">Apply Now</nc-button>
      </div>
    </nc-announcement>
  </nc-hero>

  <nc-base-section id="video-section" width="narrow">
    <div class="panel" id="video">
      <!-- TODO(CCM-108): Replace with client copy — video section heading and description -->
      <h2>About the Incubator</h2>
      <p>[PLACEHOLDER] Learn how the New Commons Incubator helps teams build sustainable data commons
         for responsible AI development.</p>
    </div>
    <iframe class="video-frame" src="https://www.youtube.com/embed/gKqNJam8iEI?si=PGI4s_Zgns_JqSg8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </nc-base-section>

  <!--<nc-timeline id="timeline" />-->

  <nc-cta id="cta" :single-column="true">
    <div class="cta-panel"
      width="narrow">
      <div class="panel-header">
        <h2 class="padding-bottom:s">FAQs</h2>
        <div class="stack">
          <div>
            <!-- TODO(CCM-108): Replace with client copy — FAQ CTA text -->
            <p>Have questions about the Incubator?</p>
            <p>Check out our FAQ page for all the answers you need to get started!</p>
          </div>
          <NuxtLink href="faq" class="button" color="white" variant="link">Read More <nc-arrow-link-up /></NuxtLink>
        </div>
      </div>
      <div class="panel-footer">
        <!-- TODO(CCM-108): Replace with client copy — webinar section -->
        <h2>Watch the Incubator Info Session</h2>
        <p>[PLACEHOLDER] Missed the live session? Watch our webinar to learn about the 2026 Incubator,
           including programme details, eligibility, and how to strengthen your application.</p>
        <nc-button href="#video" color="wt" variant="primary2">Watch now!</nc-button>
      </div>
    </div>
  </nc-cta>
  <nc-blog-section id="blog" :posts="blogposts" />

</template>

<script setup>

const { data: blogposts } = await useAsyncData('blogposts', () => queryCollection('blogposts').limit(3).all())

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

#video-section {
  background: linear-gradient(to bottom, var(--white-color) 50%, #f7f7f7 50%);
}

#video-section .panel {
  text-align: center;
  max-width: 39.5rem;
  margin: 0 auto var(--space-l-xl);
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


.video-frame {
  width: 100%;
  aspect-ratio: 16/9;
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
  border-radius: 8px 8px 0 0;
  padding: var(--space-2xl-3xl);
  :deep(svg path) {
    stroke: var(--white-color);
  }
  @media (min-width: 1120px) {
    flex-direction: row;
    align-items: center;
  }
}

#cta .cta-panel .panel-footer {
  color: var(--white-color);
  border-radius: 0 0 8px 8px;
  padding: var(--space-2xl-3xl);
  background: url('/assets/patterns/waves.png') center center no-repeat, rgba(88, 42, 142, 1);
  background-blend-mode: soft-light;
}

#cta .cta-panel .panel-footer > *:last-child {
  margin-top: var(--space-l-xl);
}

#cta .cta-panel .panel-header > * {
  flex: 1;
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
