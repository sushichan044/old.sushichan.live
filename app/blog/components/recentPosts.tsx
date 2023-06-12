import PostGrid from '@/app/blog/components/postGrid'
import { getAllMDX, getMDXMetaData } from '@/lib/mdx'

// TODO: 部分的な取得ができるようにする
const RecentPosts = async () => {
  const allPostFiles = await getAllMDX({ topDirectory: 'posts' })

  const allFrontMatters = await Promise.all(
    allPostFiles.map((mdx) => getMDXMetaData(mdx))
  )
  const sortedFrontMatters = allFrontMatters
    .filter(({ status }) => status === 'public')
    .sort((a, b) => {
      return a.date < b.date ? 1 : -1
    })

  return <PostGrid posts={sortedFrontMatters} />
}

export default RecentPosts
