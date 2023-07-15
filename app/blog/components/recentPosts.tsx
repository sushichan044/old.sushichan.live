import PostGrid from '@/app/blog/components/postGrid'
import type { BlogFrontMatter } from '@/app/blog/lib/mdx'
import type { MDX } from '@/lib/mdx/next'

// TODO: 部分的な取得ができるようにする
const RecentPosts = async ({
  mdx: frontMatters,
}: {
  mdx: MDX<BlogFrontMatter>[]
}) => {
  const sortedMDX = frontMatters.sort((a, b) => {
    return a.frontMatter.created < b.frontMatter.created ? 1 : -1
  })
  return <PostGrid posts={sortedMDX} />
}

export default RecentPosts
