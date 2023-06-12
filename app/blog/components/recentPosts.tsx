import PostGrid from '@/app/blog/components/postGrid'
import { getAllMDX, getAllMDXMetaData } from '@/lib/mdx'

// TODO: 部分的な取得ができるようにする
const RecentPosts = async () => {
  const allPostFiles = await getAllMDX({ topDirectory: 'posts' })

  const allFrontMatters = await getAllMDXMetaData(allPostFiles)

  const sortedFrontMatters = allFrontMatters.sort((a, b) => {
    return a.date < b.date ? 1 : -1
  })

  return <PostGrid posts={sortedFrontMatters} />
}

export default RecentPosts
