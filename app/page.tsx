import Link from 'next/link'

import MainContainer from '@/components/common/mainContainer'
import Section from '@/components/section'

export default async function Home() {
  return (
    <MainContainer>
      <Section>
        <p>Hello World!</p>
        <p>こんにちは世界！</p>
        <Link href="/css-fukuwarai">
          <p>CSS福笑い(α版,スマホ未対応)</p>
        </Link>
      </Section>
    </MainContainer>
  )
}
