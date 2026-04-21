<template>
  <nc-base-section background-color="transparent">
    <h1 class="title">FAQs</h1>
  </nc-base-section>

  <nc-faq-section background-color="transparent">
    <h3 class="h3">About the Incubator</h3>
    <nc-collapse name="about" v-for="item in faq.about" :key="item.summary" :data="item" />
  </nc-faq-section>
  <nc-faq-section>
    <h3 class="h3">Eligibility &amp; Application</h3>
    <nc-collapse name="eligibility" v-for="item in faq.eligibility" :key="item.summary" :data="item" />
  </nc-faq-section>
  <nc-faq-section>
    <h3 class="h3">Program Details</h3>
    <nc-collapse name="program" v-for="item in faq.program" :key="item.summary" :data="item" />
  </nc-faq-section>
  <nc-faq-section class="last-item">
    <h3 class="h3">Submissions</h3>
    <nc-collapse name="submissions" v-for="item in faq.submissions" :key="item.summary" :data="item" />
  </nc-faq-section>
</template>

<script setup>
const faq = {
  about: [
    {
      summary: 'Why should I apply for the Incubator?',
      content: `
        <ul>
          <li>Join a first-of-its-kind incubator for the next generation of data commons</li>
          <li>Become part of an international community of linguistic and cultural data commons leaders</li>
          <li>Learn emerging governance models and gain access to technical infrastructure and expertise</li>
          <li>Receive mentorship from international experts</li>
          <li>Join a community of your peers from around the world</li>
          <li>Engage with 3&ndash;5 other participants in addressing needs around Indigenous languages and cultures</li>
          <li>Share your work with global funders through the final showcase</li>
        </ul>
      `
    },
    {
      summary: 'What are the key deadlines and program milestones?',
      content: `
        <p>The Incubator will follow the schedule outlined below:</p>
        <ul>
          <li><strong>Applications Open:</strong> May</li>
          <li><strong>Informational Webinars:</strong> w/o 25 May 2026 and 1 June 2026</li>
          <li><strong>Applications Close:</strong> 10 July 2026</li>
          <li><strong>Cohort Selection:</strong> Late August</li>
          <li><strong>Cohort Onboarding:</strong> Early September</li>
          <li><strong>In-Person Kickoff:</strong> w/o 14 September 2026</li>
          <li><strong>Virtual Incubation Programming:</strong> September 2026 &ndash; January 2027</li>
          <li><strong>Final Showcase:</strong> February 2027</li>
        </ul>
      `
    },
    {
      summary: 'How will you evaluate submissions?',
      content: `
        <p>Our jury will evaluate submissions based on the following criteria:</p>
        <ul>
          <li><strong>Opportunity (30%):</strong> What's the opportunity?</li>
          <li><strong>Relevance (20%):</strong> How does the data commons support an Indigenous community?</li>
          <li><strong>Capacity (20%):</strong> What assets do you have available to manage this project?</li>
          <li><strong>Governance (20%):</strong> How will this effort be commonly governed?</li>
          <li><strong>Team (10%):</strong> Who is available to participate in the Incubator?</li>
        </ul>
        <p>More details can be found in the application form.</p>
      `
    },
  ],
  eligibility: [
    {
      summary: 'How far along does my data commons concept need to be?',
      content: `
        <p>Concepts submitted to the Incubator can be in the early stages but must be thought out
           enough so that a proposal can be completed and far enough along that there is a commitment
           from your organization for its implementation.</p>
        <p>Some concepts may be brand new initiatives whereas others may be extensions of existing
           products or programs.</p>
      `
    },
    {
      summary: 'How much data literacy is required of incubator participants?',
      content: `
        <p>Participants in this program are not expected to be data scientists or have a background
           in data science. Applicants should know enough about data that they can articulate and
           understand the theory of change of their data innovation.</p>
      `
    },
    {
      summary: 'What types of organizations can participate?',
      content: `
        <p>This initiative is most applicable to nonprofit organizations, government
           organizations, academic institutions, start-ups, non-governmental organizations, and
           development organizations. For-profit entities submitting applications may be asked to
           undergo extra review to ensure their concept note aids Indigenous communities.</p>
      `
    },
    {
      summary: 'Are there geographic restrictions?',
      content: `
        <p>The Incubator is a global initiative that welcomes entries from organizations across
           continents. We hope to receive applicants from diverse regions and contexts.</p>
        <p>We welcome any entry, though are unable to deliver programming to certain entities
           and individuals who are subject to sanctions and other restrictions under U.S. law, such
           as those based in <a href="https://ofac.treasury.gov/sanctions-programs-and-country-information/cuba-sanctions" target="_blank" rel="noopener">Cuba</a>,
           <a href="https://ofac.treasury.gov/sanctions-programs-and-country-information/iran-sanctions" target="_blank" rel="noopener">Iran</a>,
           <a href="https://ofac.treasury.gov/sanctions-programs-and-country-information/north-korea-sanctions" target="_blank" rel="noopener">North Korea</a>,
           <a href="https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/ukraine-russia-related-sanctions" target="_blank" rel="noopener">Russia</a>,
           <a href="https://ofac.treasury.gov/sanctions-programs-and-country-information/syria-sanctions" target="_blank" rel="noopener">Syria</a>,
           and the <a href="https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/ukraine-russia-related-sanctions" target="_blank" rel="noopener">Crimea</a>,
           <a href="https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/ukraine-russia-related-sanctions" target="_blank" rel="noopener">Donetsk</a>,
           and <a href="https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/ukraine-russia-related-sanctions" target="_blank" rel="noopener">Luhansk</a>
           regions of Ukraine.</p>
      `
    },
  ],
  program: [
    {
      summary: 'Do Incubator participants receive funding?',
      content: `
        <p>Incubator participants will have access to a variety of resources and the opportunity to
           present their project to global funders. Funding to implement the project is not part of
           the Incubator's offerings.</p>
      `
    },
    {
      summary: 'What is the expected time commitment?',
      content: `
        <p>The Incubator will include an in-person kickoff followed by weekly 2-hour programming
           for 4 months. At its conclusion, participants will present their work at our showcase.</p>
      `
    },
    {
      summary: 'What language will the programming be delivered in?',
      content: `
        <p>All programming will be delivered in English. There will be a public writing component
           of the programming, and if program participants would like they can publish this in their
           local language.</p>
      `
    },
    {
      summary: 'When will programming take place?',
      content: `
        <p>We plan to schedule all live engagements on a rotational schedule to accommodate the
           various timezones of program participants and will work with all participants to ensure
           that no one is consistently joining engagements during an inconvenient date or time.</p>
      `
    },
  ],
  submissions: [
    {
      summary: 'What is a "letter of support"?',
      content: `
        <p>A letter of support is any letter, on institutional letterhead, from a representative of
           an institution indicating that they are aware of the concept and their institution will
           support a representative's participation in the Incubator. It is our way of ensuring that
           a representative is able to participate in the full Incubator programming.</p>
      `
    },
    {
      summary: 'What if I am unable to submit or access the application form?',
      content: `
        <p>If, for any reason, you are unable to submit the form, you may download a text version
           of the form here and submit your responses to the questions as a Word doc or PDF file to
           <a href="mailto:newcommons@opendatapolicylab.org">newcommons@opendatapolicylab.org</a>.</p>
      `
    },
    {
      summary: 'Can my organization submit multiple applications?',
      content: `
        <p>Your organization may only submit one application. If you mistakenly submitted an
           application early and need to delete your submission before submitting a revision,
           please contact us at
           <a href="mailto:newcommons@opendatapolicylab.org">newcommons@opendatapolicylab.org</a>.</p>
      `
    },
  ],
}
</script>

<style scoped>
.title {
  font-size: var(--size-4);
  color: var(--base-color)
}

.last-item {
  margin-bottom: var(--space-2xl-3xl);
}
</style>
