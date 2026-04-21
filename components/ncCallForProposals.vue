<template>
  <nc-cta :single-column="!hasSecondary">
    <div class="stack">
      <p class="brow">Call for Proposals</p>
      <h2 class="cfp-heading">Data Commons for Indigenous Languages and Cultures</h2>
      <p class="cfp-tagline" v-html="tagline"></p>
      <div class="cfp-actions">
        <nc-button to="/incubator/2026/application" color="primary" variant="primary">Apply Now</nc-button>
        <nc-button v-if="showLearnMore" to="/incubator/indigenous-languages" color="primary" variant="secondary">Learn More</nc-button>
      </div>
    </div>
    <template v-if="hasSecondary" #right>
      <div class="secondary-box | stack">
        <slot name="secondary" />
      </div>
    </template>
  </nc-cta>
</template>

<script setup>
defineProps({
  tagline: {
    type: String,
    default: 'The Open Data Policy Lab invites changemakers around the world to join us in developing data commons for Indigenous languages and cultures.'
  },
  showLearnMore: {
    type: Boolean,
    default: true
  }
})

const slots = useSlots()
const hasSecondary = computed(() => !!slots.secondary)
</script>

<style scoped>
.cfp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
  align-items: center;
}

.brow {
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 800;
  font-size: var(--size-0);
  letter-spacing: 0.05em;
}

.cfp-heading {
  margin-top: 0;
  font-size: var(--size-3);
  color: var(--white-color);
}

.cfp-tagline {
  max-width: 50ch;
}

@media (max-width: 920px) {
  .cfp-tagline {
    max-width: 100%;
  }
}

.secondary-box {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: var(--box-shadow-l);
  color: hsl(200, 64%, 15%);
  border-radius: var(--border-radius-l);
  padding: var(--space-l);
}
</style>
