<template>
  <nc-base-section background-color="transparent">
    <h1 class="title">FAQs</h1>
  </nc-base-section>

  <nc-faq-section background-color="transparent">
    <h3 class="h3">About the Incubator</h3>
    <nc-collapse name="program" v-for="item in faq.program" :key="item.summary" :data="item" />
  </nc-faq-section>
  <nc-faq-section>
    <h3 class="h3">Eligibility</h3>
    <nc-collapse name="eligibility" v-for="item in faq.eligibility" :key="item.summary" :data="item" />
  </nc-faq-section>
  <nc-faq-section>
    <h3 class="h3">Application Process</h3>
    <nc-collapse name="application" v-for="item in faq.application" :key="item.summary" :data="item" />
  </nc-faq-section>
  <nc-faq-section>
    <h3 class="h3">Support &amp; Resources</h3>
    <nc-collapse name="support" v-for="item in faq.support" :key="item.summary" :data="item" />
  </nc-faq-section>
  <nc-faq-section>
    <h3 class="h3">Timeline &amp; Key Dates</h3>
    <nc-collapse name="timeline" v-for="item in faq.timeline" :key="item.summary" :data="item" />
  </nc-faq-section>
  <nc-faq-section class="last-item">
    <h3 class="h3">Data Governance</h3>
    <nc-collapse name="governance" v-for="item in faq.governance" :key="item.summary" :data="item" />
  </nc-faq-section>
</template>

<script setup>
const faq = {
  program: [
    // TODO(CCM-108): Replace with client copy — program description
    {
      summary: 'What is the New Commons Incubator?',
      content: `
        <p>[PLACEHOLDER] The New Commons Incubator is a 12-month programme run by the Open Data Policy Lab
           that supports teams in building and sustaining data commons for responsible AI development.
           It builds on the success of the New Commons Challenge by providing deeper, hands-on support.</p>
      `
    },
    // TODO(CCM-108): Replace with client copy — participant benefits
    {
      summary: 'What do Incubator participants receive?',
      content: `
        <p>[PLACEHOLDER] Each selected team receives:</p>
        <ul>
          <li>Grant funding (amount TBD)</li>
          <li>Mentorship from experts in data governance and AI ethics</li>
          <li>Technical support for data infrastructure and platform development</li>
          <li>Access to the Open Data Policy Lab's global network</li>
        </ul>
      `
    },
    // TODO(CCM-108): Replace with client copy — organisers
    {
      summary: 'Who runs the Incubator?',
      content: `
        <p>[PLACEHOLDER] The New Commons Incubator is an initiative of the
           <a href="https://opendatapolicylab.org/" target="_blank" rel="noopener">Open Data Policy Lab</a>,
           a collaboration between The GovLab at New York University and Microsoft.</p>
      `
    },
    // TODO(CCM-108): Replace with client copy — challenge vs incubator
    {
      summary: 'How is the Incubator different from the Challenge?',
      content: `
        <p>[PLACEHOLDER] While the Challenge was a competitive prize programme that selected two winners,
           the Incubator takes a cohort-based approach, providing sustained support over 12 months to
           multiple teams working on data commons for responsible AI.</p>
      `
    },
  ],
  eligibility: [
    // TODO(CCM-108): Replace with client copy — eligibility overview
    {
      summary: 'Who can apply to the Incubator?',
      content: `
        <p>[PLACEHOLDER] We welcome applications from nonprofits, academic institutions, startups,
           and development organisations working with data commons. Applicants must be affiliated
           with an established institution capable of managing funds.</p>
      `
    },
    // TODO(CCM-108): Replace with client copy — geographic eligibility
    {
      summary: 'Are there geographic restrictions?',
      content: `
        <p>[PLACEHOLDER] The Incubator is a global programme. We welcome applications from
           organisations worldwide, though we may be unable to deliver support to entities
           subject to sanctions under U.S. law.</p>
      `
    },
    // TODO(CCM-108): Replace with client copy — government eligibility
    {
      summary: 'Can government agencies apply?',
      content: `
        <p>[PLACEHOLDER] Government entities may not apply as lead applicants but may participate
           as collaborators or partners on a project.</p>
      `
    },
  ],
  application: [
    // TODO(CCM-108): Replace with client copy — application process
    {
      summary: 'How do I apply?',
      content: `
        <p>[PLACEHOLDER] Applications are submitted through our online form. You will need to
           provide information about your organisation, your proposed data commons project,
           and a letter of institutional support.</p>
      `
    },
    // TODO(CCM-108): Replace with client copy — deadline
    {
      summary: 'What is the application deadline?',
      content: `
        <p>[PLACEHOLDER] The application deadline is [DATE TBD]. Late applications will not
           be considered.</p>
      `
    },
    // TODO(CCM-108): Replace with client copy — multiple applications
    {
      summary: 'Can my organisation submit multiple applications?',
      content: `
        <p>[PLACEHOLDER] Each organisation may submit one application. If you need to revise
           a submission, contact us at
           <a href="mailto:newcommons@opendatapolicylab.org">newcommons@opendatapolicylab.org</a>.</p>
      `
    },
  ],
  support: [
    // TODO(CCM-108): Replace with client copy — mentorship details
    {
      summary: 'What kind of mentorship is provided?',
      content: `
        <p>[PLACEHOLDER] Selected teams are paired with mentors from the Open Data Policy Lab
           network who have expertise in data governance, AI ethics, and commons management.
           Mentorship sessions are held regularly throughout the 12-month programme.</p>
      `
    },
    // TODO(CCM-108): Replace with client copy — technical support
    {
      summary: 'What technical support is available?',
      content: `
        <p>[PLACEHOLDER] Teams receive hands-on technical assistance with data infrastructure,
           interoperability standards, and platform development. The specifics are tailored
           to each team's needs and stage of development.</p>
      `
    },
  ],
  timeline: [
    // TODO(CCM-108): Replace with client copy — key dates
    {
      summary: 'What are the key dates for the 2026 Incubator?',
      content: `
        <p>[PLACEHOLDER] Key dates:</p>
        <ul>
          <li><strong>[DATE TBD]</strong> — Applications open</li>
          <li><strong>[DATE TBD]</strong> — Applications close</li>
          <li><strong>[DATE TBD]</strong> — Cohort announced</li>
          <li><strong>[DATE TBD]</strong> — Programme begins</li>
        </ul>
      `
    },
    // TODO(CCM-108): Replace with client copy — programme duration
    {
      summary: 'How long is the Incubator programme?',
      content: `
        <p>[PLACEHOLDER] The Incubator runs for approximately 12 months from the programme
           start date. Teams are expected to make significant progress on their data commons
           within this timeframe.</p>
      `
    },
  ],
  governance: [
    // TODO(CCM-108): Replace with client copy — governance expectations
    {
      summary: 'What governance structures are expected for data commons?',
      content: `
        <p>[PLACEHOLDER] Applicants should articulate how their data commons will be
           responsibly governed, including who will be involved in oversight and strategic
           decisions about data access and use.</p>
      `
    },
    // TODO(CCM-108): Replace with client copy — governance frameworks
    {
      summary: 'Are there specific data governance frameworks we should follow?',
      content: `
        <p>[PLACEHOLDER] While we do not mandate a specific framework, applicants may find it
           useful to refer to the Open Data Policy Lab's
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
