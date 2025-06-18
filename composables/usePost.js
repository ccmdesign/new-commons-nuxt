export default function usePost() {
  const getImage = (post) => {
    return post.meta && post.meta.body && post.meta.body.cover_image ? post.meta.body.cover_image : '/images/blog-fallback.webp'
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  return {
    getImage,
    formatDate
  }
}