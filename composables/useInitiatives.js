export const initiatives = [
  {
    title: 'The New Commons Incubator for Indigenous Languages and Cultures',
    description: 'Learn more about our call for proposals for the creation of data commons for Indigenous languages and cultures.',
    status: 'Active',
    to: '/incubator/indigenous-languages',
    image: '/assets/patterns/hero.jpg',
    ctaLabel: 'View Details',
  },
  {
    title: 'The 2025 New Commons Challenge',
    description: 'Explore the groundbreaking data commons recognized at the 2025 New Commons Showcase.',
    status: 'Completed',
    to: '/challenge-2025',
    image: '/images/092525_HL011_New-Commons_Microsoft_Malawi Voice Data Commons.webp',
    ctaLabel: 'View the Awardees',
  },
]

export default function useInitiatives() {
  return initiatives
}
