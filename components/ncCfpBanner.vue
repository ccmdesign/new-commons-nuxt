<template>
  <div class="cfp-banner-wrap">
    <div class="cfp-banner" :class="{ 'cfp-banner--expanded': isExpanded }">
      <NuxtLink to="/incubator/indigenous-languages" class="cfp-banner__label">Call for Proposals</NuxtLink>
      <div class="cfp-banner__expand" :aria-hidden="!isExpanded">
        <div class="cfp-banner__expand-inner">
          <span class="cfp-banner__sep" aria-hidden="true">·</span>
          <span class="cfp-banner__title">Data Commons for Indigenous Languages and Cultures</span>
          <span class="cfp-banner__actions">
            <NuxtLink to="/incubator/indigenous-languages" class="cfp-banner__link cfp-banner__link--secondary" :tabindex="isExpanded ? 0 : -1">Learn More</NuxtLink>
            <NuxtLink to="/incubator/2026/application" class="cfp-banner__link cfp-banner__link--primary" :tabindex="isExpanded ? 0 : -1">Apply Now <span aria-hidden="true">→</span></NuxtLink>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isExpanded = ref(false)
const timers = []

function schedule(fn, ms) {
  const id = setTimeout(fn, ms)
  timers.push(id)
  return id
}

function cycle() {
  // Runs while expanded: after 20s collapse; 10s later re-expand; loop.
  schedule(() => {
    isExpanded.value = false
    schedule(() => {
      isExpanded.value = true
      cycle()
    }, 10000)
  }, 20000)
}

onMounted(() => {
  // Start collapsed, expand after 3s, then begin the 20s/10s loop.
  schedule(() => {
    isExpanded.value = true
    cycle()
  }, 3000)
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  timers.length = 0
})
</script>

<style scoped lang="scss">
.cfp-banner-wrap {
  grid-column: content-start / content-end;
  display: flex;
  justify-content: center;
  padding-top: var(--space-m);
}

.cfp-banner {
  display: grid;
  grid-template-columns: auto 0fr;
  align-items: center;
  gap: 0;
  padding: var(--space-xs) var(--space-l);
  border-radius: 999px;
  background-color: var(--primary-color);
  color: var(--white-color);
  font-size: var(--size-0);
  line-height: 1.3;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  max-width: 100%;
  transition: grid-template-columns 0.6s cubic-bezier(0.4, 0, 0.2, 1), padding 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.cfp-banner--expanded {
  grid-template-columns: auto 1fr;
  gap: var(--space-xs);
}

.cfp-banner__label {
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--white-color);
  white-space: nowrap;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover,
  &:focus-visible {
    opacity: 0.85;
  }

  &:focus-visible {
    outline: 2px solid var(--white-color);
    outline-offset: 3px;
    border-radius: 2px;
  }
}

.cfp-banner__expand {
  min-width: 0;
  overflow: hidden;
}

.cfp-banner__expand-inner {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.35s ease 0.15s, transform 0.4s ease 0.15s;
}

.cfp-banner--expanded .cfp-banner__expand-inner {
  opacity: 1;
  transform: translateX(0);
}

.cfp-banner__sep {
  opacity: 0.5;
}

.cfp-banner__title {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cfp-banner__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding-left: var(--space-s);
  margin-left: var(--space-xs);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}

.cfp-banner__link {
  white-space: nowrap;
  text-decoration: none;
  color: var(--white-color);
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  &:focus-visible {
    outline: 2px solid var(--white-color);
    outline-offset: 3px;
    border-radius: 2px;
  }
}

.cfp-banner__link--secondary {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);

  &:hover,
  &:focus-visible {
    color: var(--white-color);
  }
}

.cfp-banner__link--primary {
  font-weight: 700;
}

@media (max-width: 820px) {
  .cfp-banner {
    max-width: calc(100vw - var(--space-l));
  }

  .cfp-banner__expand-inner {
    white-space: normal;
  }

  .cfp-banner__title {
    white-space: normal;
  }

  .cfp-banner__sep {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cfp-banner,
  .cfp-banner__expand-inner {
    transition: none;
  }
}
</style>
