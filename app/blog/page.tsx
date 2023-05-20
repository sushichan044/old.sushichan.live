import RecentPosts from '@/components/blog/recentPosts'
import Section from '@/components/blog/section'

export default async function Page() {
  return (
    <>
      <Section>
        <h1>雑記</h1>
        <p>
          ここは徒歩記事から技術メモまでよくわからないコンテンツを書き溜める場です。
        </p>
      </Section>
      <h2
        style={{
          marginBlockStart: 'var(--content-margin)',
          marginBlockEnd: 'calc(var(--content-margin) * 0.25)',
        }}
      >
        最近書いた記事
      </h2>
      {/* FIXME: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#async-and-await-in-server-components */}
      {/* @ts-expect-error Async Server Component */}
      <RecentPosts />
    </>
  )
}
