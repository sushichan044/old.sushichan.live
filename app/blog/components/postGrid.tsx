import styles from '@/app/blog/components/post-grid.module.scss'
import PostGridElement from '@/app/blog/components/postGridElement'
import { MDXMetaData } from '@/lib/mdx'

const PostGrid = ({ posts }: { posts: MDXMetaData[] }) => {
  return (
    <div className={styles['post-grid']}>
      {posts.map((post) => (
        <PostGridElement key={post.title} {...post} />
      ))}
    </div>
  )
}

export default PostGrid
