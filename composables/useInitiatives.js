export const initiatives = [
  {
    title: 'The New Commons Incubator for Indigenous Languages and Cultures',
    description: 'Strengthening the pipeline of data commons for Indigenous Languages and Cultures in the AI era.',
    status: 'Active',
    to: '/incubator/indigenous-languages',
    image: '/assets/patterns/hero.jpg',
  },
  {
    title: 'The 2025 New Commons Challenge',
    description: 'Supporting new and existing data commons for humanitarian response and localized decision making.',
    status: 'Completed',
    to: '/challenge-2025',
    image: '/images/092525_HL011_New-Commons_Microsoft_Malawi Voice Data Commons.webp',
  },
]

export default function useInitiatives() {
  return initiatives
}
