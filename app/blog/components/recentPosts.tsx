import PostGrid from '@/app/blog/components/postGrid'
import { type MDXMetaData } from '@/lib/mdx'

// TODO: 部分的な取得ができるようにする
const RecentPosts = async ({
  frontMatters,
}: {
  frontMatters: MDXMetaData[]
}) => {
  const sortedFrontMatters = frontMatters.sort((a, b) => {
    return a.date < b.date ? 1 : -1
  })

  return <PostGrid posts={sortedFrontMatters} />
}

export default RecentPosts
