import ArticleCard from '@/components/blog/articleCard'
import styles from '@/components/blog/recent-posts.module.scss'
import { getAllMDXSlugs, getMDXExistence, getMDXFrontMatter } from '@/lib/mdx'

const RecentPosts = async () => {
  // https://qiita.com/xx2xyyy/items/9116d52d6dfd4f3549ef
  const allPosts = (await getAllMDXSlugs())
    .map((slug) => getMDXExistence(slug))
    .flatMap((mdx) => (mdx.exists ? mdx : []))

  const metaDatas = allPosts.map((mdx) =>
    getMDXFrontMatter(mdx.fileName, mdx.extension)
  )

  return (
    <div className={styles['post-grid']}>
      {metaDatas.map((metaData) => (
        <ArticleCard key={metaData.title} {...metaData} />
      ))}
    </div>
  )
}

export default RecentPosts
