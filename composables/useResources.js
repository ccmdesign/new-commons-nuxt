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

  return {
    getImage,
    getResourceLink,
    isExternalLink,
  }
}
