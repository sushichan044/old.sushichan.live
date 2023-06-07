import MainContainer from '@/components/common/mainContainer'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MainContainer>{children}</MainContainer>
    </>
  )
}
