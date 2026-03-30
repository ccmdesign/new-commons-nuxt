export const initiatives = [
  {
    title: 'The 2025 Challenge',
    description: 'The inaugural New Commons Challenge awarded two $100,000 prizes to teams building data commons for responsible AI development.',
    status: 'Completed',
    to: '/the-2025-challenge',
    image: '/assets/patterns/hero.jpg',
  },
  {
    title: 'Indigenous Languages',
    description: 'Supporting the development of data commons that preserve and promote indigenous languages in the age of AI.',
    status: 'Coming Soon',
    to: '/incubator/indigenous-languages',
    image: '/assets/patterns/hero.jpg',
  },
]

export default function useInitiatives() {
  return initiatives
}
