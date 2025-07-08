<template>
  <nc-hero>
    <div class="hero__content stack">
      <div class="panel">
        <p class="h4 subtitle">Where Innovation Meets Collaboration</p>
        <h2 class="h1">Event</h2>
        <p>A ac aliquet interdum aenean cursus. Neque sit faucibus arcu sed nec at ut risus sagittis. Viverra arcu quis tincidunt duis phasellus. Lacus sagittis at neque neque ut id eu pretium. Nisl arcu eu pellentesque fusce quisque dui. Quis pharetra nulla odio fusce pellentesque duis leo.</p>
        <p>Aliquam id eget volutpat massa parturient tristique faucibus elementum malesuada. Cursus montes sit sed amet morbi malesuada id. Mauris at ultrices dignissim bibendum cursus aliquam id. Vulputate semper id etiam amet orci. Ante cursus viverra purus semper nullam consequat commodo odio malesuada.</p>
      </div>
    </div>
  </nc-hero>

  <nc-base-section class="aux">
    <h2>Overview</h2>
    <p>The 2024 Kluz Prize for PeaceTech was awarded to Harshwardhan Zala, CEO and Co-Founder of Aerobotics7, and Urvashi Kikani, CTO and Co-Founder, for their groundbreaking work in landmine detection and UXO removal using AI and autonomous systems.</p>
    <p>Special distinctions were presented to:</p>
    <ul>
      <li>Håvard Hegre, Director of VIEWS for the Use of AI for Peace (with Simon Polichinel von der Maase accepting the award on his behalf as a dedicated researcher for VIEWS);</li>
      <li>Max Cooper, Principal Research Scientist and Science Team Lead at Lunasonde, for Space Technology for Peace;</li>
      <li>Joel Myhre, DEEP Project Coordinator for the Danish Refugee Council, for Humanitarian Impact with their DEEP platform.</li>
    </ul>
    <p>The 2024 Kluz Prize for PeaceTech was awarded on September 20, 2024, on the eve of the International Day of Peace during the 79th United Nations General Assembly. The event was celebrated in New York City, recognizing innovators and pioneers using technology to foster a more peaceful and secure future.</p>
  </nc-base-section>

  <nc-base-section>
    <h2 class="h1">Winners</h2>
    <nc-winners :winners="winners" />
  </nc-base-section>

  <nc-base-section>
    <h2 class="h1">Event</h2>
    <div class="switcher">
      <div class="card-aux">
        <h3>Event Picture</h3>
      </div>
      <div class="card-aux">
        <h3>Event Picture</h3>
      </div>
      <div class="card-aux">
        <h3>Event Picture</h3>
      </div>
    </div>
  </nc-base-section>

  <nc-base-section>
    <h2 class="h1">Selection Committee</h2>
    <nc-judges-grid />
  </nc-base-section>

  <nc-blog-section />
</template>

<script setup>
const { data: winners } = await useAsyncData('winners', () => queryCollection('winners')
  .all())

</script>

<style scoped>
.hero__content {
  @media (min-width: 768px) {
    grid-column: content-start / col6;
  }
}
</style>