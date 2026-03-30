// TODO(CCM-129): Replace placeholder data with actual steering committee members
export const steeringCommittee = [
  {
    name: 'Member One',
    slug: 'member-one',
    description: 'Title, Organization',
    img: 'placeholder.jpg',
    bio: 'Bio text for steering committee member one.',
  },
  {
    name: 'Member Two',
    slug: 'member-two',
    description: 'Title, Organization',
    img: 'placeholder.jpg',
    bio: 'Bio text for steering committee member two.',
  },
  {
    name: 'Member Three',
    slug: 'member-three',
    description: 'Title, Organization',
    img: 'placeholder.jpg',
    bio: 'Bio text for steering committee member three.',
  },
]

export default function useSteeringCommittee() {
  return steeringCommittee
}
