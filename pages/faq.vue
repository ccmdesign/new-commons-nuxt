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
    <h3 class="h3">Data Commons &amp; Governance</h3>
    <nc-collapse name="governance" v-for="item in faq.governance" :key="item.summary" :data="item" />
  </nc-faq-section>
</template>

<script setup>
const faq = {
  about: [
    {
      summary: 'What is the New Commons Incubator?',
      content: `
        <p>The New Commons Incubator is a programme run by the
           <a href="https://opendatapolicylab.org/" target="_blank" rel="noopener">Open Data Policy Lab</a>,
           a collaboration between The GovLab at New York University and Microsoft. It supports
           teams building and sustaining data commons for responsible AI development through
           funding, mentorship, and technical resources.</p>
      `
    },
    {
      summary: 'How is the Incubator different from the New Commons Challenge?',
      content: `
        <p>The New Commons Challenge was a competitive prize programme that awarded two $100,000
           prizes to outstanding data commons projects. The Incubator builds on that foundation
           by taking a cohort-based approach, providing sustained support to multiple teams as
           they develop or strengthen their data commons over time.</p>
      `
    },
    {
      summary: 'What do Incubator participants receive?',
      content: `
        <p>Each selected team receives:</p>
        <ul>
          <li>Grant funding to support the development or enhancement of their data commons</li>
          <li>Mentorship from experts in data governance, AI ethics, and commons management</li>
          <li>Technical support for data infrastructure, interoperability, and platform development</li>
          <li>Access to the Open Data Policy Lab's global network of policymakers, technologists, and data practitioners</li>
        </ul>
      `
    },
  ],
  eligibility: [
    {
      summary: 'Who can apply to the Incubator?',
      content: `
        <p>We welcome applications from nonprofits, academic institutions, startups, and
           development organisations working to build or strengthen data commons for responsible
           AI. Applicants must be affiliated with an established institution capable of managing funds.</p>
      `
    },
    {
      summary: 'Are there geographic restrictions?',
      content: `
        <p>The Incubator is a global programme. We welcome applications from organisations
           worldwide, though we may be unable to deliver support to entities subject to
           sanctions under U.S. law.</p>
      `
    },
    {
      summary: 'Can government agencies apply?',
      content: `
        <p>Government entities may not apply as lead applicants but may participate as
           collaborators or partners on a project.</p>
      `
    },
    {
      summary: 'How do I apply?',
      content: `
        <!-- TODO: [CCM-129] Add application form URL when available -->
        <p>Applications are submitted through our online form. You will need to provide
           information about your organisation, your proposed data commons project, and
           a letter of institutional support. Check the
           <a href="/incubator/2026">Incubator page</a> for the latest application details.</p>
      `
    },
  ],
  program: [
    {
      summary: 'How long is the Incubator programme?',
      content: `
        <p>The Incubator programme provides sustained support to selected teams. Teams are
           expected to make significant progress on their data commons within the programme
           timeframe, with regular check-ins and milestones along the way.</p>
      `
    },
    {
      summary: 'What kind of mentorship is provided?',
      content: `
        <p>Selected teams are paired with mentors from the Open Data Policy Lab network who
           have expertise in data governance, AI ethics, and commons management. Mentorship
           sessions are held regularly throughout the programme to help teams navigate
           technical, governance, and sustainability challenges.</p>
      `
    },
    {
      summary: 'What technical support is available?',
      content: `
        <p>Teams receive hands-on technical assistance with data infrastructure,
           interoperability standards, and platform development. The specifics are tailored
           to each team's needs and stage of development.</p>
      `
    },
  ],
  governance: [
    {
      summary: 'What is a data commons?',
      content: `
        <p>A data commons is a shared resource where data is collectively managed and made
           accessible for the public good. Data commons for AI provide the foundational datasets
           and governance structures needed to develop artificial intelligence responsibly,
           ensuring that AI systems serve broad societal interests.</p>
      `
    },
    {
      summary: 'What governance structures are expected for data commons?',
      content: `
        <p>Applicants should articulate how their data commons will be responsibly governed,
           including who will be involved in oversight and strategic decisions about data
           access and use. Strong governance ensures that data is managed transparently
           and equitably.</p>
      `
    },
    {
      summary: 'Are there specific data governance frameworks we should follow?',
      content: `
        <p>While we do not mandate a specific framework, applicants may find it useful to
           refer to the Open Data Policy Lab's
           <a href="https://incubator.opendatapolicylab.org/files/data-commons-for-ai-blueprint.pdf" target="_blank" rel="noopener">
           Blueprint to Unlock New Data Commons for AI</a> for guidance on governance approaches.</p>
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
