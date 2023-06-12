import RecentPosts from '@/app/blog/components/recentPosts'
import Section from '@/components/section'

export default async function Page() {
  return (
    <>
      <Section>
        <h1>雑記</h1>
        <p>文字を書きますよ</p>
      </Section>
      <Section>
        <h2>最近書いた記事</h2>
        <RecentPosts />
      </Section>
    </>
  )
}
