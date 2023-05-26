import Link from 'next/link'

import MainContainer from '@/components/common/mainContainer'

export default async function Home() {
  return (
    <MainContainer>
      <p>Hello World!</p>
      <p>こんにちは世界！</p>
      <Link href="/css-fukuwarai">
        <p>CSS福笑い(α版,スマホ未対応)</p>
      </Link>
    </MainContainer>
  )
}
