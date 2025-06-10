<template>
  <nc-hero id="hero">
    <div class="hero__content | cluster | subgrid">
      <div class="panel">
        <h1>New Commons Challenge</h1>
        <p>The <b>Open Data Policy Lab</b> invites global changemakers to propose innovative data commons for generative
          AI that serves the public interest. By enhancing data diversity, quality, and provenance, we can unlock AI’s
          potential to innovate and solve complex challenges.</p>
        <nc-button el="a"
          href="apply"
          color="base"
          variant="primary">Join the Challenge Today</nc-button>
        <span>Applications open until <strong>June 2nd.</strong></span>
      </div>
      <img split-left
        src="assets/images/hero.jpg"
        alt="Hero Image">
    </div>
  </nc-hero>

  <nc-base-section id="video-section"
    width="narrow">
    <div class="panel">
      <h2>The Challenge</h2>
      <p>This video explains what the Challenge is and why data commons are key to developing responsible and effective
        AI systems.</p>
    </div>
    <div class="video-placeholder">Video Section</div>
  </nc-base-section>

  <nc-timeline id="timeline" />

  <nc-cta id="cta"
    :single-column="true">
    <div class="cta-panel"
      width="narrow">
      <div class="panel-header">
        <h2>FAQs</h2>
        <div>
          <p>Have questions about the challenge? <br />Check out our FAQ page for all the answers you need to get
            started!</p>
          <NuxtLink href="faq">Read More </NuxtLink>
        </div>
      </div>
      <div class="panel-footer">
        <h2>Watch the New Commons Challenge webinar</h2>
        <p>Missed the live session? Catch up on our 5 May 2025 webinar to learn key details about the New Commons Challenge, including what we’re looking for and how to strengthen your concept note. We also answered live questions from prospective applicants.</p>
        <nc-button el="a" color="white" variant="secondary">Watch now!</nc-button>
      </div>
    </div>
  </nc-cta>

  <nc-blog-section id="blog"
    :posts="blogposts" />

</template>

<script setup>

const { data: blogposts } = await useAsyncData('blogposts', () => queryCollection('blogposts').all())

</script>

<style scoped>
.hero__content {
  display: grid;
  grid-template-columns: subgrid;
  margin-bottom: var(--space-2xl-3xl);
}

.hero__content>*:first-child {
  grid-column: content-start / col6;
}

.hero__content .panel {
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  max-width: 39.5rem;
}

.hero__content .panel span {
  font-weight: 300;
  font-size: var(--size-0);
}

.hero__content .panel h1 {
  margin-bottom: var(--space-xs-s);
}

.hero__content .panel a {
  margin: var(--space-l-xl) 0;
  font-weight: 400;
}

.hero__content>*:last-child {
  grid-column: col7 / content-end;
}

.hero__content img {
  aspect-ratio: 1/1;
}

#video-section {
  background: linear-gradient(to bottom, var(--white-color) 50%, #f7f7f7 50%);
}

#video-section .panel {
  text-align: center;
  max-width: 39.5rem;
  margin: 0 auto var(--space-l-xl);
}


.video-placeholder {
  aspect-ratio: 16/9;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-m);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-l);
  font-weight: 500;
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
  flex-direction: row;
  align-items: center;
  text-align: left;
  color: var(--white-color);
  background: url('./assets/patterns/squares.svg') left top no-repeat, #0E2F40;
  background-size: contain;
  border-radius: 8px 8px 0 0;
  padding: var(--space-2xl-3xl);
}

#cta .cta-panel .panel-footer {
  color: var(--white-color);
  border-radius: 0 0 8px 8px;
  padding: var(--space-2xl-3xl);
  background: url('./assets/patterns/waves.png') center center no-repeat, rgba(88, 42, 142, 1);
  background-blend-mode: darken;
}

#cta .cta-panel .panel-footer > *:last-child {
  margin-top: var(--space-l-xl);
}

#cta .cta-panel .panel-header > * {
  flex: 1;
}
</style>