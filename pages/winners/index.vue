<template>
  <nc-hero>
    <div class="hero__content">
      <div class="panel stack">
        <h2 class="h1 text-align:center">Overview</h2>
        <div class="switcher">
          <div>
            <p>On September 25, 2025, the New Commons Challenge awarded two $100,000 prizes to foster data commons for responsible AI development. 
              The first of these awards went to the <strong>Malawi Voice Data Commons Project</strong>—developed by the New York University Peace Research and Education Program and Ushahidi—for the development of a data commons. 
              The second award went to the <strong>Amazon Rainforest Evolution Index</strong>, developed by CERTI Amazonia, for the enhancement of an existing data commons.</p>
              <p>The event took place as part of the broader 80<sup><small>th</small></sup> UN General Assembly events and was an affiliate session of the Digital@UNGA program. We thank our partners DirectRelief and the Harvard Institutional Data Initiative, as well as our observer UNESCO, for their support.</p>
              <p>Information on each grantee and special distinction can be found below. For each grantee, we provide a brief description of their projects taken from their proposals and then information about how they can be contacted, should you be interested in learning more about their work or offering support.</p>
            </div>
            <div class="honors">
              <p class="honors__heading">Awardees:</p>
              <ul class="honors__cards">
                <li v-for="card in awardees" :key="card.title">
                    <NuxtLink
                      :to="`/winners/${card.slug}`"
                      class="honors-card honors-card--link"
                    >
                      <span class="honors-card__title">{{ card.title }}</span>
                      <span class="honors-card__meta">{{ card.applicant }}</span>
                    </NuxtLink>
                </li>
              </ul>
              <p class="honors__heading">Honorary distinctions were given to:</p>
              <ul class="honors__cards">
                <li v-for="card in honorsCards" :key="card.title">
                  <NuxtLink
                    v-if="card.slug"
                    :to="`/winners/${card.slug}`"
                    class="honors-card honors-card--link"
                  >
                    <span class="honors-card__title">{{ card.title }}</span>
                    <span class="honors-card__meta">{{ card.applicant }}</span>
                  </NuxtLink>
                  <div v-else class="honors-card honors-card--disabled">
                    <span class="honors-card__title">{{ card.title }}</span>
                    <span class="honors-card__meta">{{ card.applicant }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  </nc-hero>

  <nc-base-section color="faded" size="xl">
    <h2 class="text-align:center">Awardees</h2>
    <nc-winners :winners="awardees" />
  </nc-base-section>

  <nc-base-section v-if="honoraryDistinctions.length">
    <h2 class="text-align:center">Honorary Distinctions</h2>
    <nc-winners :winners="honoraryDistinctions" />
  </nc-base-section>

  <nc-base-section color="faded">
    <h2>The New Commons Challenge Showcase</h2>
    <p>The winners were announced on September 25, 2025 at the New Commons Challenge Showcase. The Showcase was held in New York City during the 80th United Nations General Assembly. The event brought together leading voices in AI and data governance for an evening filled with learning and meaningful connections to shape the future of public-interest AI.</p>
  </nc-base-section>

  <nc-base-section>
    <section class="winners-gallery stack">
      <h2 class="text-align:center">Celebration Highlights</h2>
      <p class="text-align:center">Scenes from the New Commons Challenge ceremony and community gatherings.</p>
      <div class="winners-gallery__grid">
        <div
          v-for="(i, index) in highlights"
          :key="`gallery-image-${index}`"
          class="winners-gallery__item"
          @click="data.activeImage = i"
        >
          <img
            :src="i.src"
            :alt="i.alt"
            loading="lazy"
          />
        </div>
      </div>
      <div class="winners-gallery__hl" v-if="data.activeImage">
        <button class="winners-gallery__close" @click="data.activeImage = null">X</button>
        <img :src="data.activeImage.src" :alt="data.activeImage.alt" />
      </div>
    </section>
  </nc-base-section>

  <nc-blog-section :posts="blogposts" />
</template>

<script setup>
const { data: winners } = await useAsyncData('winners', () => queryCollection('winners')
  .all())

const awardees = computed(() => (winners.value ?? []).filter((winner) => {
  const prize = winner.prize?.toLowerCase() || ''
  return prize && !prize.includes('honorary')
}))

const honoraryDistinctions = computed(() => (winners.value ?? []).filter((winner) => {
  const prize = winner.prize?.toLowerCase() || ''
  return prize.includes('honorary')
}))

const honorsCards = computed(() => {
  const honors = honoraryDistinctions.value ?? []

  if (honors.length) {
    return honors.map(({ title, applicant, slug }) => ({
      title,
      applicant,
      slug,
    }))
  }

  return [
    {
      title: 'Climate Mobility Case Database',
      applicant: 'Zolberg Institute on Migration and Mobility, The New School',
      slug: 'climate-mobility-case-database'
    },
    {
      title: 'PLACE Trust in Nigeria',
      applicant: 'ThisisPLACE Foundation',
      slug: 'the-place-trust-in-nigeria'
    },
    {
      title: 'Querido Diário',
      applicant: 'Open Knowledge Brasil',
      slug: 'querido-diario'
    },
    {
      title: 'Know Your City Academy',
      applicant: 'Slum Dwellers International',
      slug: 'know-your-city-academy'
    }
  ]
})

const { data: blogposts } = await useAsyncData('blogposts', () =>
  queryCollection('blogposts')
  .order('date', 'DESC').limit(3).all()
);

const highlights = [
  {
    src: '/images/092525_HL011_New-Commons_Microsoft_Malawi Voice Data Commons.webp',
    alt: 'Replace alt text'
  },
  {
    src: '/images/092525_HL014_New-Commons_Microsoft_Amazon Rainforest Evolution Index Award Winner.webp',
    alt: 'Replace alt text'
  },
  {
    src: '/images/092525_HL018_New-Commons_Microsoft_Malawi Award Presentation.webp',
    alt: 'Replace alt text'
  },
  {
    src: '/images/092525_HL023_New-Commons_Microsoft_Malawi Award Presentation 1.webp',
    alt: 'Replace alt text'
  },
  {
    src: '/images/092525_HL026_New-Commons_Microsoft_Amazon Rainforest Presentation.webp',
    alt: 'Replace alt text'
  },
]

const data = reactive({
  activeImage: null
})
</script>

<style scoped>

.honors__heading {
  font-weight: 600;
  margin-bottom: var(--space-s);
}

.honors__cards {
  list-style: none;
  display: grid;
  gap: var(--space-3xs);
  padding: 0;
  margin: 0;
}

.honors-card {
  border: 1px solid var(--base-color-10-tint);
  border-radius: var(--border-radius-l);
  padding: var(--space-2xs) var(--space-s);
  display: grid;
  background: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  color: inherit;
  transition: box-shadow 150ms ease, transform 150ms ease;
}

.honors-card--link:hover,
.honors-card--link:focus-visible {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.honors-card--disabled {
  cursor: default;
  opacity: 0.85;
}

.honors-card__title {
  font-weight: 600;
  font-size: var(--size-0);
}

.honors-card__meta {
  font-size: var(--size--1);
  color: var(--base-color-70-tint);
}

.winners-gallery {
  --_stack-space: var(--space-l);
}

.winners-gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-m);
}

.winners-gallery__item {
  border-radius: var(--border-radius-l);
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.winners-gallery__item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.winners-gallery__hl {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80vw;
  transform: translate(-50%, -50%);
  padding: var(--space-xl);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--base-color);
  @media (max-width: 36em) {
    display: none;
  }
  img {
      max-width: 100%;
      max-height: 80vh;
      width: auto;
  }
  .winners-gallery__close {
    position: absolute;
    top: var(--space-s);
    right: var(--space-s);
    font-weight: 700;
    font-size: var(--size-1);
    background: none;
    border: none;
    color: var(--white-color);
    cursor: pointer;
  }
}

.switcher {
  --_switcher-space: var(--space-xl);
}
</style>
