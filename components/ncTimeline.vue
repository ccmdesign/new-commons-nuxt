<!-- Used by indigenous-languages.vue. TODO: [CCM-129] Re-integrate into incubator/2026 when timeline data is available. -->
<template>
  <ccm-base-section class="timeline | subgrid" background-color="gray">
    <div class="timeline__content">
      <h2>{{ title }}</h2>
      <p>{{ subtitle }}</p>
      <div class="timeline__content-cards" ref="cardsContainer">
        <div class="card" :class="{'active': isActive(item, i), 'full': isFull(item, i)}" v-for="(item, i) in timeline" :key="item.date">
          <span class="card__date">{{ formatDate(item.date) }}</span>
          <span class="card__marker" aria-hidden="true"></span>
          <h3 class="card__event">{{ item.event }}</h3>
          <span class="card__time">
            {{ formatTime(item.date) }}
          </span>
        </div>
      </div>
    </div>
  </ccm-base-section>
</template>


<script setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  timeline: {
    type: Array,
    default: () => [],
    validator: (val) => val.every(item => 'date' in item && 'event' in item)
  },
  title: { type: String, default: 'Timeline' },
  subtitle: { type: String, default: '' },
  firstActive: { type: Boolean, default: false }
})

const now = ref(new Date())
const cardsContainer = ref(null)

onMounted(async () => {
  now.value = new Date()
  await nextTick()
  scrollToActive()
})

function isActive(item, index) {
  if (props.firstActive && index === 0) return true
  return now.value >= new Date(item.date)
}

function scrollToActive() {
  const container = cardsContainer.value
  if (!container) return
  const activeCards = container.querySelectorAll('.card.active')
  const target = activeCards[activeCards.length - 1]
  if (!target) return
  container.scrollTo({
    left: target.offsetLeft - container.offsetLeft,
    behavior: 'instant',
  })
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
  display: flex;
  flex-wrap: nowrap;
  grid-column: content-start / content-end;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  padding-bottom: var(--space-s);
}

.timeline__content-cards .card {
  position: relative;
  padding-right: var(--space-m);
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
  flex: 0 0 240px;
  min-width: 240px;
  scroll-snap-align: start;
}

.timeline__content-cards .card__date {
  font-weight: 600;
}

.timeline__content-cards .card.active .card__date {
  color: var(--primary-color);
}

.timeline__content-cards .card__event {
  font-weight: 600;
  margin-top: var(--space-xs);
}

.timeline__content-cards .card.active .card__event {
  color: var(--primary-color);
}

.timeline__content-cards .card__time {
  font-weight: 300;
}

.timeline__content-cards .card__marker {
  display: block;
  position: relative;
  height: 15px;
  margin-block: var(--space-xs);
}

.timeline__content-cards .card__marker::before {
  content: '';
  position: absolute;
  border-radius: 100%;
  z-index: 20;
  width: 15px;
  height: 15px;
  background: #eaeaea;
  top: 0;
  left: 0;
}

.timeline__content-cards .card__marker::after {
  content: '';
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 1px;
  background: #eaeaea;
  top: 7px;
  left: 0;
}

.timeline__content-cards .card.active .card__marker::before {
  background: var(--primary-color);
}

.timeline__content-cards .card.active.full .card__marker::after {
  background: var(--primary-color);
}
</style>
