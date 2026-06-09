// "Voices from the Commons" testimonials — single source of truth.
// Static content (not in the `people` collection) so it lives as a composable,
// matching useSiteLinks. Swap for a content query later without touching ncVoices.
export default function useTestimonials() {
  return [
    {
      text: 'The Commons Incubator is important because it creates a space where communities, researchers, and infrastructure providers can work together to ensure that emerging technologies strengthen, rather than diminish, Indigenous authority over language and cultural knowledge.',
      name: 'Jenny Fewster',
      role: 'Director, Humanities, Arts, Social Sciences and Indigenous Research Data Commons, Australian Research Data Commons (ARDC)',
    },
    {
      text: 'The Indigenous AI Data Commons and Incubator provide a powerful model for how communities, researchers, and technologists can work together to preserve linguistic heritage while creating new opportunities for innovation, education, and cultural resilience.',
      name: 'Chinomso Mishael Chukwuma',
      role: 'AI Engineer · Scientific Computing Graduate Student, Harrisburg University of Science and Technology · Founder, MizSpace Technology',
    },
    {
      text: 'True language revitalization happens where intergenerational transmission meets data sovereignty. Working alongside global technical and policy experts offers vital pathways, but investing in the long-term capacity of Indigenous Peoples is the foundational requirement. Indigenous communities should not just be passive contributors; they must be equipped with the tools to actively govern, manage, and steward their own linguistic heritage.',
      name: 'Dr. Jeannet Stephen',
      role: 'Indigenous Representative, Global Task Force for a Decade of Action for Indigenous Languages · PACOS Trust · Associate Professor, BorIIS UMS',
    },
  ]
}
