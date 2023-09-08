import Link from '@/components/base/link'
import Section from '@/components/base/section'
import MainContainer from '@/components/common/mainContainer'

export default async function Home() {
  return (
    <MainContainer>
      <Section>
        <p>
          このサイトはβ版です。
          <br />
          現在
          <Link
            href="/blog"
            options={{ textDecoration: 'underline', color: 'blue' }}
          >
            ブログ
          </Link>
          のみ実装されています。
        </p>
      </Section>
    </MainContainer>
  )
}
