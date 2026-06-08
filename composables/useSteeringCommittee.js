export default function useSteeringCommittee() {
  return useAsyncData('steering-committee', () =>
    queryCollection('people').where('type', '=', 'steering').all()
  )
}
