<template>
  <nc-hero id="hero">
    <div class="hero__content">
      <div class="panel | stack">
        <h1>New Commons Challenge</h1>
        <p>The <b>Open Data Policy Lab</b> invites global changemakers to propose innovative data commons for generative
          AI that serves the public interest. By enhancing data diversity, quality, and provenance, we can unlock AI’s
          potential to innovate and solve complex challenges.</p>
        <!--<nc-button el="a"
          href="apply"
          color="base"
          variant="primary">Join the Challenge Today</nc-button>-->
      </div>
      <div class="hero__image-div">
        <img 
          src="/assets/patterns/hero.jpg"
          alt="Hero Image" />
          <nc-minimal-logo />
      </div>
    </div>
    <nc-announcement content="Applications closed June 11th." color="primary" />
  </nc-hero>

  <nc-base-section id="video-section" width="narrow">
    <div class="panel">
      <h2>The Challenge</h2>
      <p>This video explains what the Challenge is and why data commons are key to developing responsible and effective
        AI systems.</p>
    </div>
    <iframe class="video-frame" src="https://www.youtube.com/embed/gKqNJam8iEI?si=PGI4s_Zgns_JqSg8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </nc-base-section>

  <nc-timeline id="timeline" />

  <nc-cta id="cta" :single-column="true">
    <div class="cta-panel"
      width="narrow">
      <div class="panel-header">
        <h2 class="padding-bottom:s">FAQs</h2>
        <div class="stack">
          <div>
            <p>Have questions about the challenge?</p>
            <p>Check out our FAQ page for all the answers you need to get started!</p>
          </div>
          <NuxtLink href="faq" class="button" color="white" variant="link">Read More <nc-arrow-link-up /></NuxtLink>
        </div>
      </div>
      <div class="panel-footer">
        <h2>Watch the New Commons Challenge webinar</h2>
        <p>Missed the live session? Catch up on our 5 May 2025 webinar to learn key details about the New Commons Challenge, including what we’re looking for and how to strengthen your concept note. We also answered live questions from prospective applicants.</p>
        <nc-button el="a" color="wt" variant="primary2">Watch now!</nc-button>
      </div>
    </div>
  </nc-cta>
  <!--<nc-blog-section id="blog" :posts="blogposts" />-->

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