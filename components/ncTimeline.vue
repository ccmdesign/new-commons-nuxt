<template>
  <ccm-base-section class="timeline | subgrid" background-color="gray">
    <div class="timeline__content">
      <h2>Timeline</h2>
      <p>Key dates for The New Commons Challenge:</p>
      <div class="timeline__content-cards">
        <div class="card" :class="{'active': i <= 3, 'full': i<=2}" v-for="i in 4" :key="i">
          <h3>{{ new Date(timeline[i-1].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Canada/Pacific' }) }}</h3>
          <span>
            {{
              new Date(timeline[i-1].date)
                .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'shortGeneric', timeZone: 'Canada/Pacific' })
                .replace(/AM/, 'a.m.').replace(/PM/, 'p.m.')
            }}
          </span>
          <p>{{timeline[i-1].event}}</p>
        </div>
      </div>
    </div>
  </ccm-base-section>
</template>


<script setup>
// @TODO: Add this to the CMS
const timeline = [
  {
    "date": "2025-04-14T00:00:00-07:00",
    "event": "Start date of accepting concept notes"
  },
  {
    "date": "2025-06-10T23:59:00-07:00",
    "event": "End date of accepting concept notes"
  },
  {
    "date": "2025-06-16T00:00:00-07:00",
    "event": "Invitations to submit full proposal"
  },
  {
    "date": "2025-07-14T23:59:00-07:00",
    "event": "Full proposal submission closes"
  }
]
</script>

<style scoped lang="scss">
.timeline {
  grid-column: full-start / full-end; /* Grid template columns are defined by the .subgrid class, and grid-column attr. */
}

.timeline {
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
  background:  linear-gradient(90deg, #1E99FF 0%, #1E99FF 33.33%, #EAEAEA 66.67%, #EAEAEA 100%);
} 

.timeline__content-cards .card.active.full::after {
  background: linear-gradient(90deg, #1E99FF 0%, #1E99FF 33.33%, #1E99FF 66.67%, #1e99ff 100%);
}
</style>
