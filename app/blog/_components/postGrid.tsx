import ArticleCard from '@/app/blog/_components/articleCard'
import styles from '@/app/blog/_components/post-grid.module.scss'
import { mdxMetaDataWithFile } from '@/lib/mdx'

const PostGrid = ({ posts }: { posts: mdxMetaDataWithFile[] }) => {
  return (
    <div className={styles['post-grid']}>
      {posts.map((post) => (
        <ArticleCard key={post.title} {...post} />
      ))}
    </div>
  )
}

export default PostGrid
