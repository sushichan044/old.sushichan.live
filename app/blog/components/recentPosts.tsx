import PostGrid from '@/app/blog/components/postGrid'
import { getAllMDXFile, getAllMDXMetaData } from '@/lib/mdx'

// TODO: 部分的な取得ができるようにする
const RecentPosts = async () => {
  const allPostFiles = getAllMDXFile({ topDirectory: 'posts' })
  const allFrontMatters = getAllMDXMetaData(allPostFiles)

  const sortedFrontMatters = allFrontMatters.sort((a, b) => {
    return a.date < b.date ? 1 : -1
  })

  return <PostGrid posts={sortedFrontMatters} />
}

export default RecentPosts
