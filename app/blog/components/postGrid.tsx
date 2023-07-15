import styles from '@/app/blog/components/post-grid.module.scss'
import PostGridElement from '@/app/blog/components/postGridElement'
import type { BlogFrontMatter } from '@/app/blog/lib/mdx'
import type { MDX } from '@/lib/mdx/next'

const PostGrid = ({ posts }: { posts: MDX<BlogFrontMatter>[] }) => {
  return (
    <div className={styles['post-grid']}>
      {posts.map((post) => (
        <PostGridElement key={post.fileMetaData.fileName} {...post} />
      ))}
    </div>
  )
}

export default PostGrid
