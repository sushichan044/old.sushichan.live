import RecentPosts from '@/app/blog/components/recentPosts'
import Section from '@/components/section'
import { getAllMDXFile, getAllMDXMetaData } from '@/lib/mdx'
export default async function Page() {
  const allPostFiles = getAllMDXFile({ topDirectory: 'posts' })
  const allFrontMatters = getAllMDXMetaData(allPostFiles)
  return (
    <>
      <Section>
        <h1>雑記</h1>
        <p>文字を書きますよ</p>
      </Section>
      <Section>
        <h2>最近書いた記事</h2>
        <RecentPosts frontMatters={allFrontMatters} />
      </Section>
    </>
  )
}
