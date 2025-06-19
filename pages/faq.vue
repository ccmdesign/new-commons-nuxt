<template>
  <nc-base-section background-color="transparent">
    <h1 class="title">FAQs</h1>
  </nc-base-section>

  <nc-faq-section background-color="transparent">
    <h3 class="h3">Challenge Information</h3>
    <nc-collapse name="challenge" v-for="item in faq" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section>
    <h3 class="h3">Eligibility and Institutional Affiliation</h3>
    <nc-collapse name="eligibility" v-for="item in faq" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section >
    <h3 class="h3">Application Process</h3>
    <nc-collapse name="application" v-for="item in faq" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section >
    <h3 class="h3">Project Scope and Partnerships</h3>
    <nc-collapse name="project" v-for="item in faq" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section >
    <h3 class="h3">Proposal Evaluation Criteria</h3>
    <nc-collapse name="proposal" v-for="item in faq" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section >
    <h3 class="h3">Localized Decision-Making</h3>
    <nc-collapse name="localized" v-for="item in faq" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section >
    <h3 class="h3">Support and Technical Capacity</h3>
    <nc-collapse name="support" v-for="item in faq" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section class="last-item">
    <h3 class="h3">Challenge Timeline and Submission Details</h3>
    <nc-collapse name="timeline" v-for="item in faq" :key="item.summary" :data="item" />          
  </nc-faq-section>
</template>

<script setup>
const faq = [
  {
    summary: 'What is the New Commons Challenge?',
    content: 'The New Commons Challenge is a global competition that seeks to create and improve data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets. The challenge addresses a critical issue: the limited access to diverse and high-quality datasets, which is essential for AI to reach its full potential. By creating and improving data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets, the gap in AI development can be filled. The challenge seeks to seed new data commons to ensure that AI benefits all.',
  },{
    summary: 'What is the New Commons Challenge?',
    content: 'The New Commons Challenge is a global competition that seeks to create and improve data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets. The challenge addresses a critical issue: the limited access to diverse and high-quality datasets, which is essential for AI to reach its full potential. By creating and improving data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets, the gap in AI development can be filled. The challenge seeks to seed new data commons to ensure that AI benefits all.',
  },{
    summary: 'What is the New Commons Challenge?',
    content: 'The New Commons Challenge is a global competition that seeks to create and improve data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets. The challenge addresses a critical issue: the limited access to diverse and high-quality datasets, which is essential for AI to reach its full potential. By creating and improving data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets, the gap in AI development can be filled. The challenge seeks to seed new data commons to ensure that AI benefits all.',
  },{
    summary: 'What is the New Commons Challenge?',
    content: 'The New Commons Challenge is a global competition that seeks to create and improve data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets. The challenge addresses a critical issue: the limited access to diverse and high-quality datasets, which is essential for AI to reach its full potential. By creating and improving data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets, the gap in AI development can be filled. The challenge seeks to seed new data commons to ensure that AI benefits all.',
  },{
    summary: 'What is the New Commons Challenge?',
    content: 'The New Commons Challenge is a global competition that seeks to create and improve data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets. The challenge addresses a critical issue: the limited access to diverse and high-quality datasets, which is essential for AI to reach its full potential. By creating and improving data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets, the gap in AI development can be filled. The challenge seeks to seed new data commons to ensure that AI benefits all.',
  },{
    summary: 'What is the New Commons Challenge?',
    content: 'The New Commons Challenge is a global competition that seeks to create and improve data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets. The challenge addresses a critical issue: the limited access to diverse and high-quality datasets, which is essential for AI to reach its full potential. By creating and improving data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets, the gap in AI development can be filled. The challenge seeks to seed new data commons to ensure that AI benefits all.',
  },{
    summary: 'What is the New Commons Challenge?',
    content: 'The New Commons Challenge is a global competition that seeks to create and improve data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets. The challenge addresses a critical issue: the limited access to diverse and high-quality datasets, which is essential for AI to reach its full potential. By creating and improving data commons, which are collaboratively governed data ecosystems that pool and provide responsible access to diverse, high-quality datasets, the gap in AI development can be filled. The challenge seeks to seed new data commons to ensure that AI benefits all.',
  }
  
];
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