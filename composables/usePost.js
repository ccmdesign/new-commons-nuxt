export default function usePost() {
  const getImage = (post) => {
    return post?.cover_image ? post.cover_image : '/images/blog-fallback.webp'
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