import RecentPosts from '@/app/blog/components/recentPosts'
import Section from '@/components/section'

export default async function Page() {
  return (
    <>
      <Section>
        <h1>雑記</h1>
        <p>
          ここは徒歩記事から技術メモまでよくわからないコンテンツを書き溜める場です。
        </p>
      </Section>
      <Section>
        <h2>最近書いた記事</h2>
        {/* FIXME: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#async-and-await-in-server-components */}
        <RecentPosts />
      </Section>
    </>
  )
}
