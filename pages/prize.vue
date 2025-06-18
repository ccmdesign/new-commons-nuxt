<template>
  <nc-hero>
    <div class="hero__content">
      <div class="panel">
        <p class="hero__brow">A Prize for a Shared Digital Future</p>
        <h1>What is the prize?</h1>
        <p>The New Commons Challenge is an initiative led by Microsoft and the Open Data Policy Lab, in partnership with DirectRelief, the Harvard Institutional Data Initiative, and UNESCO (international observer).</p>
        <p>The challenge addresses a critical issue: the limited access to diverse and high-quality datasets, which is essential for AI to reach its full potential. By creating and improving data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets, the gap in AI development can be filled. The challenge seeks to seed new data commons to ensure that AI benefits all.</p>
      </div>
      <div class="hero__image-div">
        <nc-minimal-logo></nc-minimal-logo>
      </div>
    </div>
  </nc-hero>

  <nc-base-section width="narrow">
    <h2>What are we looking for?</h2>
    <div class="switcher">
      <div class="panel | panel-aux">
        <h3>Improve Localized Decision-making</h3>
        <p>Help local leaders make better policy or improve their reasoning capabilities through improved access to or insights from data</p>
      </div>
      <div class="panel | panel-aux">
        <h3>Humanitarian Interventions</h3>
        <p>Strengthen disaster response capabilities using AI.</p>
      </div>
    </div>
    <nc-cta id="cta"
      :single-column="true">
      <div class="cta-panel"
        width="narrow">
        <div class="panel-header switcher">
          <div>
            <h2>Prizes</h2>
            <p>The New Commons Challenge will select two winning proposals to receive the following support package:</p>
            <div class="cluster">
              <div class="button" color="base" variant="primary">Apply now</div>
              <div class="button" color="base" variant="secondary">View Rules</div>
            </div>
          </div>
          <div>
            <ul>
              <li>
                <p><span>Two</span> winners</p>
              </li>
              <li>
                <p><span>USD 100,000</span> in funding each</p>
              </li>
              <li>
                <p>Mentorship on establishing and managing data commons</p>
              </li>
              <li>
                <p>Technical support as needed</p>
              </li>
              <li>
                <p>Access to the Open Data Policy Lab’s global network of experts</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="panel-footer switcher">
          <div>
            <h2>Who can apply?</h2>
          </div>
          <div>
            <h4>Eligibility</h4>
            <p>We welcome proposals from diverse regions, communities, and organizations working with various data types. Your proposed data commons must aim to serve at least one of our key focus areas (Improve Localized Decision-making or Humanitarian Intervention).</p>
            <nc-button color="base" variant="ghost">Read here</nc-button>
            <h4>Evaluation</h4>
            <p>Proposals will be reviewed by an international jury of experts from both focus areas.</p>
            <nc-button color="base" variant="ghost">Read here</nc-button>
          </div>
        </div>
      </div>
    </nc-cta>
  </nc-base-section>

  <nc-base-section>
    <div class="switcher">
      <h2>Helpful Tips</h2>
      <div>
        <h3>Our Blueprint</h3>
        <p>This Challenge aims to implement our recently published Blueprint to Unlock New Data Commons for Artificial Intelligence, which shows how organizations can launch data commons in the public interest. Organizations may find it useful to refer to this report as they develop their concept notes and proposals.</p>

        <h4>Inspiration</h4>
        <p>As this is an emerging area of practice, we understand that few organizations have developed data commons for AI. To help applicants think about how they may use data commons to support their work, we have assembled a list of instructive examples of data commons in action here.</p>
        
        <p>Please note that these data commons cover a range of topics beyond the areas of focus for this challenge.</p>
      </div>
    </div>
  </nc-base-section>

  <nc-base-section>
    <h2 class="h1">Judges</h2>
    <nc-judges-grid />
  </nc-base-section>

  <nc-blog-section />
</template>

<script setup>

</script>

<style scoped lang="scss">
.hero__content {
  margin-bottom: 0;
  .panel {
    margin-bottom: var(--space-xl);
  }
}

.hero__image-div {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  :deep(.minimal-logo) {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }
}

</style>