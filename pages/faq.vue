<template>
  <nc-base-section>
    <h1>FAQ</h1>
  </nc-base-section>

  <nc-faq-section>
    <h3 class="h2">Challenge Information</h3>
    <nc-collapse v-for="item in faq" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section>
    <h3 class="h2">Eligibility and Institutional Affiliation</h3>
    <nc-collapse v-for="item in faq" :key="item.summary" :data="item" />          
  </nc-faq-section>
  <nc-faq-section>
    <h3 class="h2">Application Process</h3>
    <nc-collapse v-for="item in faq" :key="item.summary" :data="item" />          
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

</style>