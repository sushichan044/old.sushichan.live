import ErrorComponent from '@/components/error'

export default async function Page() {
  return (
    <>
      <h1>500 Server Error</h1>
      <ErrorComponent />
    </>
  )
}
