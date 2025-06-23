<template>
  <nc-base-section background-color="transparent">
    <h1 class="title">FAQs</h1>
  </nc-base-section>

  <nc-faq-section background-color="transparent">
    <h3 class="h3">Challenge Information</h3>
    <nc-collapse name="challenge" v-for="item in faq.information" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section>
    <h3 class="h3">Eligibility and Institutional Affiliation</h3>
    <nc-collapse name="eligibility" v-for="item in faq.eligibility" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section >
    <h3 class="h3">Application Process</h3>
    <nc-collapse name="application" v-for="item in faq.application" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section >
    <h3 class="h3">Project Scope and Partnerships</h3>
    <nc-collapse name="project" v-for="item in faq.scope" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section >
    <h3 class="h3">Proposal Evaluation Criteria</h3>
    <nc-collapse name="proposal" v-for="item in faq.criteria" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section >
    <h3 class="h3">Localized Decision-Making</h3>
    <nc-collapse name="localized" v-for="item in faq.decision" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section >
    <h3 class="h3">Support and Technical Capacity</h3>
    <nc-collapse name="support" v-for="item in faq.support" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section class="last-item">
    <h3 class="h3">Challenge Timeline and Submission Details</h3>
    <nc-collapse name="timeline" v-for="item in faq.timeline" :key="item.summary" :data="item" />       
  </nc-faq-section>
</template>

<script setup>
const faq = {
  information: [
    {
      summary: 'What is the focus of this Challenge?',
      content: `
        <p>As noted on our website, the New Commons Challenge seeks to address emerging questions around the development of artificial intelligence. While AI is celebrated as the defining technology of our time, the data needed to build these systems responsibly and effectively is increasingly out of reach.</p>
        <p>Building on the Open Data Policy Lab’s research on “<a href="https://opendatapolicylab.org/articles/blog-post-the-emergent-landscape-of-data-commons-a-brief-survey-and-comparison-of-existing-initiatives/" target="_blank" rel="noopener">data commons</a>”—shared pools of data resources that are managed using participatory approaches—we seek to fill this gap and support the development of AI systems that align with public needs and expectations. We seek to do this in the domains of humanitarian response and localized decisionmaking, two areas where additional resources are urgently needed.</p>
      `,
    },
    {
      summary: 'What is the Open Data Policy Lab?',
      content: `
        <p><a href="https://opendatapolicylab.org/" target="_blank" rel="noopener">The Open Data Policy Lab</a> is a collaboration between The GovLab at New York University and Microsoft. It supports decision-makers at the local, state and national levels as they accelerate the responsible re-use and opening of data for the benefit of society and the equitable spread of economic opportunity.</p>
      `,
    },
    {
      summary: 'What will awardees receive?',
      content: `
        <p>This challenge will distribute two grant awards:</p>
        <ul>
          <li><strong>Award 1:</strong> Development of a Data Commons: $100,000 will be awarded to one applicant who seeks to develop a new data commons to support responsible AI development for humanitarian response and/or localized decisionmaking</li>
          <li><strong>Award 2:</strong> Enhancement of a Data Commons: $100,000 will be awarded to one applicant who seeks to strengthen an existing data commons to support responsible AI development for humanitarian response and/or localized decisionmaking.</li>
        </ul>
        <p>Both prize winners will receive additional technical support and access to the Open Data Policy Lab’s network of experts.</p>
      `,
    },
    {
      summary: 'What makes a strong submission?',
      content: `
        <p>We welcome initiatives that expand access to diverse data sources, including text, video, images, audio, and synthetic data as outlined in the Open Data Policy Lab’s <a href="https://incubator.opendatapolicylab.org/files/data-commons-for-ai-blueprint.pdf" target="_blank" rel="noopener">A Blueprint to Unlock New Data Commons for AI</a>.</p>
        <p>Applicants may find inspirational examples of what to submit in our list of instructive examples <a href="https://docs.google.com/spreadsheets/d/1GPzU4Pspi-XOmJU13LvOUUPxtfTuRXcZMBw7lxkQRyY/edit?gid=0#gid=0" target="_blank" rel="noopener">here</a>.</p>
      `,
    }
  ],
  eligibility: [
    {
      summary: 'Are there any geographic restrictions?',
      content: `
        <p>The New Commons Challenge is a global innovation challenge that welcomes entries from organizations across continents. We hope to receive applicants from diverse regions and contexts.</p>
        <p>We welcome any entry, though we may be unable to deliver prizes to certain entities and individuals who are subject to sanctions and other restrictions under U.S. law, such as those based in 
          <a href="https://ofac.treasury.gov/sanctions-programs-and-country-information/cuba-sanctions" target="_blank" rel="noopener">Cuba</a>, 
          <a href="https://ofac.treasury.gov/sanctions-programs-and-country-information/iran-sanctions" target="_blank" rel="noopener">Iran</a>, 
          <a href="https://ofac.treasury.gov/sanctions-programs-and-country-information/north-korea-sanctions" target="_blank" rel="noopener">North Korea</a>, 
          <a href="https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/ukraine-russia-related-sanctions" target="_blank" rel="noopener">Russia</a>, 
          <a href="https://ofac.treasury.gov/sanctions-programs-and-country-information/syria-sanctions" target="_blank" rel="noopener">Syria</a>, and the 
          <a href="https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/ukraine-russia-related-sanctions" target="_blank" rel="noopener">Crimea, Donestsk, and Luhansk regions of Ukraine</a>.
        </p>
      `,
    },
    {
      summary: 'Can my organization submit an application in a language other than English?',
      content: `
        <p>While we welcome entries from a variety of applicants, we are unfortunately only able to review applications in English. You may use translation services (e.g. Google Translate) to help you submit your application if need be.</p>
      `,
    },
    {
      summary: 'What if my organization is not incorporated as a nonprofit? Am I eligible?',
      content: `
        <p>We feel this challenge may be most applicable to nonprofit organizations, academic institutions, start-ups, and development organizations. If applicants are asked to submit a full proposal, they may be asked to provide information about their tax status.</p>
        <p>For-profit entities submitting proposals may be asked to undergo extra review to ensure their proposal aids the public on an issue related to humanitarian response and/or localized decision-making. Government entities may not apply.</p>
      `,
    },
    {
      summary: 'Can my organization work with another organization to submit a proposal?',
      content: `
        <p>While you may submit a proposal in coordination with another organization, we will distribute funds to only the lead organizer’s institution. It will be the responsibility of the team to appropriately distribute funds.</p>
      `,
    },
    {
      summary: 'What do you mean by “being affiliated with an established organization”?',
      content: `
        <p>Applicants must be affiliated with an established institution capable of managing funds and supporting project execution. A letter of institutional support is required to confirm this affiliation. We do not fund individuals directly.</p>
      `,
    },
    {
      summary: 'If a project has support from high-profile funders, does that affect eligibility? Is there a minimum organization size?',
      content: `
        <p>No. Prior funding or organization size does not affect eligibility. We focus on whether the applicant has the capacity to complete the proposed work.</p>
      `,
    },
  ],
  application: [
    {
      summary: 'What is the application process for the New Commons Challenge?',
      content: `
        <p>The New Commons Challenge takes place over two phases.</p>
        <ul>
          <li><strong>Phase 1:</strong> Applicants will be asked to fill out a form providing basic information of the opportunity they hope to address, the data they intend to use to address that opportunity, the relevance to humanitarian response and/or localized decisionmaking; and how the project will be commonly governed. These submissions—”concept notes”—will be reviewed by the Open Data Policy Lab team, with compelling applications referred to Phase 2.</li>
          <li><strong>Phase 2:</strong> Applicants will be asked to submit a full proposal outlining their approach, including the ways that their proposed work innovates, its feasibility, its impact, and the delivery team. These proposals will be reviewed and evaluated by an expert jury. Details on format of proposals will be provided to applicants when referred.</li>
        </ul>
      `,
    },
    {
      summary: 'What will be required to submit for the full proposal?',
      content: `
        <p>Details on the requirements of the full proposal be provided to applicants at the start of the second phase via email. If you did not receive these requirements, please message us at <a href="mailto:newcommons@opendatapolicylab.org" target="_blank" rel="noopener">newcommons@opendatapolicylab.org</a>.</p>
      `,
    },
    {
      summary: 'What are the key deadlines and program milestones for the New Commons Challenge?',
      content: `
        <p>The Challenge will follow the schedule outlined below:</p>
        <p><strong>Monday, April 14, 2025</strong></p>
        <ul><li>1st Phase: Concept note submission opens</li></ul>
        <p><strong>Monday, June 10, 2025</strong></p>
        <ul><li>Concept note submission closes</li></ul>
        <p><strong>Monday, June 16, 2025</strong></p>
        <ul>
          <li>Applicants who are invited to submit full proposals are notified</li>
          <li>2nd Phase: full proposal submission opens</li>
        </ul>
        <p><strong>Monday, July 14, 2025</strong></p>
        <ul><li>Full proposal submission closes</li></ul>
        <p><strong>August – November 2025</strong></p>
        <ul>
          <li>Judging phase</li>
          <li>Winners notified & announced</li>
          <li>Implementation and Support Phase</li>
        </ul>
      `,
    },
    {
      summary: 'Can my organization submit multiple applications?',
      content: `
        <p>No, your organization may only submit one application for evaluation. If you mistakenly submitted an application early and need to delete your submission before submitting a revision, please contact us at <a href="mailto:newcommons@opendatapolicylab.org" target="_blank" rel="noopener">newcommons@opendatapolicylab.org</a>.</p>
      `,
    },
    {
      summary: 'What if I am unable to submit or access the form?',
      content: `
        <p>To facilitate this Challenge, we rely on the Google Form here. If, for any reason, you are unable to submit the form, you may download a text version of the form <a href="https://docs.google.com/document/d/1KedF0ozxqt-YzsK4QC87YxHTTQKw5gLtpP40liEiZVY/edit?usp=sharing" target="_blank" rel="noopener">here</a> and submit your responses to the questions as a Word doc or PDF file to <a href="mailto:newcommons@opendatapolicylab.org" target="_blank" rel="noopener">newcommons@opendatapolicylab.org</a>.</p>
      `,
    },
    {
      summary: 'What is a “letter of support”?',
      content: `
        <p>A letter of support is any letter, on institutional letterhead, from a representative of an institution indicating that they are aware of the proposal and their institution will support it if funded. It is our way of ensuring that any project funded can sustain itself beyond the initial $100,000.</p>
      `,
    },
    {
      summary: 'How will I be informed about any decision regarding my submitted concept note?',
      content: `
        <p>All applicants will be notified via email of whether they will be invited to submit to the second phase by the week of June 16, 2025. All decisions made by the Open Data Policy Lab team are final.</p>
      `,
    },
  ],
  scope: [
    {
      summary: 'Can local government agencies participate as collaborators, but not as lead applicants? Are there limitations on resource sharing?',
      content: `
        <p>Yes. Governments may be partners but not lead applicants. If resource sharing is involved, it will be reviewed to ensure Challenge funds are not directed primarily to government entities.</p>
      `,
    },
    {
      summary: 'Can a proposal focus on strengthening community-led organizations?',
      content: `
        <p>Yes, if the work includes the creation or enhancement of a data commons for AI.</p>
      `,
    },
    {
      summary: 'Do you help applicants find partners?',
      content: `
        <p>We do not facilitate formal matchmaking. Applicants are encouraged to build partnerships independently.</p>
      `,
    },
  ],
  criteria: [
    {
      summary: 'What is the “opportunity” criterion evaluating?',
      content: `
        <p>This criterion looks at:</p>
        <ul>
          <li>The relevance and urgency of the problem addressed</li>
          <li>The creativity and novelty of the approach</li>
          <li>Alignment with Challenge Blueprint methodologies or data types</li>
          <li>Potential for scalability or broader impact</li>
        </ul>
      `,
    },
    {
      summary: 'Are there restrictions on political applications of projects (e.g. advocacy)?',
      content: `
        <p>We do not fund partisan political work. Projects with policy implications are eligible, as long as they serve public interest objectives and are not aligned with a specific political agenda.</p>
      `,
    },
    {
      summary: 'How will my application be evaluated?',
      content: `
        <p>Each phase of the Challenge will be evaluated according to a preset criteria. For Phase 1, that is:</p>
        <p><strong>Opportunit: </strong>What’s the opportunity</p>
        <ul>
          <li>What’s the problem that this proposed work is seeking to address?</li>
          <li>Does it suggest any creative or unconventional approaches for addressing the challenge?</li>
          <li>Does the approach align with one of the approaches or data types outlined in our blueprint?</li>
        </ul>
        <p>Weighting: 40%</p>
        <p><strong>Data: </strong>What's the data the team has access to?</p>
        <ul>
          <li>Does the proposal indicate that the team has or is able to responsibly secure access to data?</li>
          <li>Is the data and its proposed application in any way new or non-traditional?</li>
          <li>Would the insights provided fill a known gap in the research? </li>
        </ul>
        <p>Weighting: 25%</p>
        <p><strong>Relevance: </strong>How does the proposal support localized decision-making/disaster response?</p>
        <ul>
          <li>Does the proposal outline a pathway in which this work would support localized decision-making or disaster response?</li>
          <li>Does it address an urgent need in the field or further empower any actors?</li>
        </ul>
        <p>Weighting: 20%</p>
        <p><strong>Governance: </strong>How will this effort be commonly governed?</p>
        <ul>
          <li>Does the project team articulate how the data commons will be responsibly governed?</li>
          <li>Who will be involved in overseeing the data commons and making strategic decisions about how it is used?</li>
        </ul>
        <p>Weighting: 15%</p>
        <p>For Phase 2, that is: </p>
        <p><strong>Innovation</strong></p>
        <ul>
          <li>How well does the individual/team articulate the problem that the solution is trying to address? </li>
          <li>How novel and original is the approach in addressing access to Open Data Commons?</li>
          <li>Does the proposal introduce creative or unconventional ideas?</li>
          <li>How well does the proposal demonstrate innovative ways of developing a New Commons to prepare data and/or combine datasets to inform responsible AI development?</li>
        </ul>
        <p>Weighting: 30%</p>
        <p><strong>Impact</strong></p>
        <ul>
          <li>Does the proposal solve a pressing challenge or address a substantial opportunity regarding humanitarian response or localized decision-making?</li>
          <li>How well does the proposal address the ability to generate insights that help to inform the actions of real-world decision makers?</li>
          <li>How clearly has the individual/team defined the end users and the potential to provide real world benefits for these users?</li>
        </ul>
        <p>Weighting: 30%</p>
        <p><strong>Delivery Team</strong></p>
        <ul>
          <li>How does the proposal outline the core team’s capabilities and plan to fill any identified gaps?</li>
          <li>How does the proposal demonstrate a clear understanding of the skills required to deliver and scale the solution, and the route to attaining the required resources and skills?</li>
          <li>How does the proposal articulate roles and responsibilities within the internal organization team and the wider delivery team?</li>
        </ul>
        <p>Weighting: 10%</p>
      `,
    },
    {
      summary: 'Who will be evaluating my application?',
      content: `
        <p>The first phase of the Challenge will be evaluated by the staff of the <a href="https://opendatapolicylab.org/team/" target="_blank" rel="noopener">Open Data Policy Lab</a>.</p>
        <p>A list of the judges for the second phase will be published on the New Commons in June 2025. </p>
      `,
    },
    {
      summary: 'Can I dispute any decision regarding the application evaluation process?',
      content: `
        <p>All decisions made as part of the New Commons Challenge are final and may not be disputed.</p>
      `,
    },
  ],
  decision: [
    {
      summary: 'Can you further specify which types of local actors you mean by localized decisions?',
      content: `
        <p>“Local” refers to decision-making as close to the community as possible. National or global data used to inform local action qualifies. See our examples for guidance.</p>
      `,
    },
    {
      summary: 'Does localized decision-making require public input sessions?',
      content: `
        <p>No, but public input can be included if it strengthens the project. You are encouraged to outline any community engagement in your governance plan.</p>
      `,
    },
  ],
  support: [
    {
      summary: 'Will winners receive technical assistance for creating/enhancing AI commons?',
      content: `
        <p>Some support (e.g., on governance) will be available, but applicants are expected to have core capacity to implement the project. You should describe your implementation plan in the proposal.</p>
      `,
    },
    {
      summary: 'Are there requirements for third-party audits to ensure governance plans?',
      content: `
        <p>No, but applicants may choose to include audits as part of their governance strategy.</p>
      `,
    },
  ],
  timeline: [
  {
    summary: 'When does Phase 1 of the Challenge begin?',
    content: `
        <p>Phase 1 (concept note submission) began on <strong>April 14, 2025</strong> and ends <strong>June 10, 2025</strong>.</p>
        <p>Phase 2 (technical proposal) starts <strong>June 16</strong> and ends <strong>July 14</strong>. Final selection will follow.</p>
    `,
  },
  {
    summary: 'When is the letter of institutional support due?',
    content: `
      <p>It must be included with your concept note by <strong>June 10, 2025</strong>.</p>
    `,
  },
  {
    summary: 'Where do I submit my proposal?',
    content: `
      <p>
        Via the submission form on the Challenge website (top-right corner) or directly via this 
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeXuJ9C5tVuISC6Q6HS8-KE8jho_Xl6wz-FV_no0Yx-oRWkMA/viewform" target="_blank" rel="noopener">
          link
        </a>.
      </p>
    `,
  },
  {
    summary: 'Is there a deadline by which funded projects must be completed?',
    content: `
      <p>
        We aim for significant progress by <strong>November 2025</strong>, though we recognize some projects may evolve over a longer timeframe.
      </p>
    `,
  },
]




};
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