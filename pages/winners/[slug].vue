<template>
  <nc-hero>
    <div class="hero__content">
      <div class="panel stack">
        <nuxt-link to="/winners" class="h4 subtitle">← Back to Winners</nuxt-link>
        <hgroup>
          <p class="h3 text-transform:uppercase text-color:primary">{{ winner.prize }} | {{ winner.brow }}</p>
          <h2 class="h1">{{ winner.title }}</h2>
        </hgroup>
      </div>
    </div>
  </nc-hero>

  <nc-base-section>
    <div class="winner__main | with-sidebar" reversed>
      
      <aside class="winner-sidebar stack">
        <section class="winner-sidebar__card">
          <h3 class="h4">Project Details</h3>
          <dl class="winner-meta">
            <div v-if="winner.applicant">
              <dt>Applicant</dt>
              <dd>{{ winner.applicant }}</dd>
            </div>
            <div v-if="winner.country">
              <dt>Country</dt>
              <dd>{{ winner.country }}</dd>
            </div>
            <div v-if="winner.prize">
              <dt>Prize</dt>
              <dd>{{ winner.prize }}</dd>
            </div>
          </dl>
        </section>

        <section v-if="projectLinks.length" class="winner-sidebar__card">
          <h3 class="h4">Project Links</h3>
          <ul class="winner-links">
            <li v-for="link in projectLinks" :key="link.href">
              <nc-button
                el="a"
                :href="link.href"
                target="_blank"
                rel="noopener"
                variant="secondary"
                color="primary"
                size="s"
              >{{ link.label }}</nc-button>
            </li>
          </ul>
        </section>
      </aside>

      <article class="winner-body stack">
        <figure
          v-if="heroImage"
          class="winner-body__image"
        >
          <img
            :src="heroImage.src"
            :alt="heroImage.alt"
            loading="lazy"
          />
          <figcaption v-if="heroImage.caption">{{ heroImage.caption }}</figcaption>
        </figure>
        <div v-if="video.src && video.src.startsWith('https://player.vimeo')" style="padding:56.25% 0 0 0;position:relative;"><iframe :src="video.src" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" :title="winner.title"></iframe></div>
        <video v-else-if="video.src" controls >
          <source :src="video.src" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
         <div
          v-if="winner.description"
          class="winner-description"
          v-html="winner.description"
        />
        <p v-else>No description available.</p>
      </article>

      
    </div>
  </nc-base-section>

</template>

<script setup>
import { computed } from 'vue'

const route = useRoute()
import { videos } from '~/composables/useVideos'
const video = videos.find(video => video.slug === route.params?.slug)

const { data: winner } = await useAsyncData('winner', () => queryCollection('winners')
  .where('slug', '=', route.params?.slug)
  .first())

const fallbackImage = '/images/blog-fallback.webp'

const heroImage = computed(() => {
  const title = winner.value?.title ?? 'Project'

  const cover = winner.value?.image
  if (typeof cover === 'string' && cover.trim().length) {
    return {
      src: cover,
      alt: `${title} cover image`,
    }
  }

  const gallery = winner.value?.winner_images
  if (Array.isArray(gallery) && gallery.length) {
    const first = gallery[0]

    if (typeof first === 'string' && first.trim().length) {
      return {
        src: first,
        alt: `${title} image`,
      }
    }

    const src = first?.src || first?.url || first?.href || first?.image || first?.file
    if (typeof src === 'string' && src.trim().length) {
      const alt = typeof first?.alt === 'string' && first.alt.trim().length
        ? first.alt.trim()
        : `${title} image`
      const caption = typeof first?.caption === 'string' && first.caption.trim().length
        ? first.caption.trim()
        : undefined

      return {
        src,
        alt,
        caption,
      }
    }
  }

  return {
    src: fallbackImage,
    alt: `${title} image placeholder`,
  }
})

const projectLinks = computed(() => {
  const links = []

  if (winner.value?.project_url) {
    links.push({
      href: winner.value.project_url,
      label: 'Primary Website',
    })
  }

  if (winner.value?.alt_url) {
    links.push({
      href: winner.value.alt_url,
      label: links.length ? 'Additional Link' : 'Project Link',
    })
  }

  return links
})

</script>

<style scoped>

.subtitle {
  text-decoration: none;
}


.winner-body {
  --_stack-space: var(--space-s);
}

.winner-description :deep(p) {
  line-height: 1.62;
}

.winner-description :deep(a) {
  color: var(--primary-color);
  text-decoration: underline;
}


.winner-body__image {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.winner-body__image img {
  width: 100%;
  max-width: 100%;
  border-radius: var(--border-radius-l);
  object-fit: cover;
}

.winner-body__image figcaption {
  font-size: var(--size--1);
  color: var(--base-color-60-tint);
}

.winner-meta {
  display: grid;
  gap: var(--space-xs);
}

.winner-meta dt {
  font-weight: 600;
  font-size: var(--size--1);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.winner-meta dd {
  margin: 0 0 var(--space-s) 0;
  font-size: var(--size-0);
  color: var(--base-color-80-tint);
}

.winner-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-3xs);
}

video {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: var(--border-radius-l);
}
</style>
