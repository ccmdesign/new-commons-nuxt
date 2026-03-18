<template>
  <ccm-base-section class="timeline | subgrid" background-color="gray">
    <div class="timeline__content">
      <h2>{{ title }}</h2>
      <p>{{ subtitle }}</p>
      <div class="timeline__content-cards">
        <div class="card" :class="{'active': isActive(item), 'full': isFull(item, i)}" v-for="(item, i) in timeline" :key="item.date">
          <h3>{{ formatDate(item.date) }}</h3>
          <span>
            {{ formatTime(item.date) }}
          </span>
          <p>{{ item.event }}</p>
        </div>
      </div>
    </div>
  </ccm-base-section>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  timeline: {
    type: Array,
    default: () => [],
    validator: (val) => val.every(item => 'date' in item && 'event' in item)
  },
  title: { type: String, default: 'Timeline' },
  subtitle: { type: String, default: '' }
})

const now = ref(new Date())
onMounted(() => {
  now.value = new Date()
})

function isActive(item) {
  return now.value >= new Date(item.date)
}

function isFull(item, index) {
  // A card is "full" (connecting line filled) if the next card is also active
  const nextItem = props.timeline[index + 1]
  return nextItem ? now.value >= new Date(nextItem.date) : false
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Canada/Pacific'
  })
}

function formatTime(dateStr) {
  return new Date(dateStr)
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'shortGeneric',
      timeZone: 'Canada/Pacific'
    })
    .replace(/AM/, 'a.m.')
    .replace(/PM/, 'p.m.')
}
</script>

<style scoped lang="scss">
.timeline {
  grid-column: full-start / full-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
}

.timeline__content {
  grid-template-columns: subgrid;
  padding: var(--space-2xl-3xl) 0;
}

.timeline__content-cards {
  margin-top: var(--space-xl-2xl);
  display: grid;
  grid-column: content-start / content-end;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.timeline__content-cards .card {
  position: relative;
  padding-top: var(--space-xl-2xl);
  display: flex;
  flex-direction: column;
}

.timeline__content-cards .card h3, .timeline__content-cards .card span:first-of-type {
  font-weight: 600;
}

.timeline__content-cards .card.active h3, .timeline__content-cards .card.active span:first-of-type {
  color: var(--primary-color);
  font-weight: 600;
}

.timeline__content-cards .card span:last-of-type {
  font-weight: 300;
  margin-top: var(--space-s);
}

.timeline__content-cards .card::before {
  content: '';
  position: absolute;
  border-radius: 100%;
  z-index: 20;
  width: 15px;
  height: 15px;
  background: #eaeaea;
  inset: 0;
}

.timeline__content-cards .card::after {
content: '';
  position: absolute;
  border-radius: 100%;
  z-index: 10;
  width: 100%;
  height: 1px;
  background: #eaeaea;
  inset: 0;
  top: 7px;
}

.timeline__content-cards .card.active::before {
  background: var(--primary-color);
}

.timeline__content-cards .card.active::after {
  background: #eaeaea;
}

.timeline__content-cards .card.active.full::after {
  background: var(--primary-color);
}
</style>
