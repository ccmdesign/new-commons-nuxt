export default function useResources() {
  const getImage = (resource) => {
    return resource?.cover_image ? resource.cover_image : '/images/resource-fallback.webp'
  }

  const getResourceLink = (resource) => {
    return resource?.url || resource?.file || '#'
  }

  const isExternalLink = (resource) => {
    const link = getResourceLink(resource)
    return link.startsWith('http') || link.startsWith('//')
  }

  const categories = (resources) => {
    if (!resources?.length) return []
    const cats = [...new Set(resources.map(r => r.category).filter(Boolean))]
    return cats.sort()
  }

  return {
    getImage,
    getResourceLink,
    isExternalLink,
    categories,
  }
}
