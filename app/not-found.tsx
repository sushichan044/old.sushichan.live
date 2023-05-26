import Section from '@/components/blog/section'
import BackButton from '@/components/common/backButton'
import MainContainer from '@/components/common/mainContainer'

export default async function NotFound() {
  return (
    <MainContainer>
      <Section>
        <p>存在しないページです。</p>
        <BackButton />
      </Section>
    </MainContainer>
  )
}
