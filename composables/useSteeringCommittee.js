// TODO(CCM-129): Replace placeholder data with actual steering committee members
const placeholderImg = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=3262&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export const steeringCommittee = [
  {
    name: 'Member One',
    slug: 'member-one',
    description: 'Title, Organization',
    img: placeholderImg,
    bio: 'Bio text for steering committee member one.',
  },
  {
    name: 'Member Two',
    slug: 'member-two',
    description: 'Title, Organization',
    img: placeholderImg,
    bio: 'Bio text for steering committee member two.',
  },
  {
    name: 'Member Three',
    slug: 'member-three',
    description: 'Title, Organization',
    img: placeholderImg,
    bio: 'Bio text for steering committee member three.',
  },
]

export default function useSteeringCommittee() {
  return steeringCommittee
}
