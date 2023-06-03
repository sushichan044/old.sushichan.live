import ArticleCard from '@/app/blog/_components/articleCard'
import styles from '@/app/blog/_components/recent-posts.module.scss'
import { getAllMDXSlugs, getMDXExistence, getMDXFrontMatter } from '@/lib/mdx'

// TODO: 部分的な取得ができるようにする
const RecentPosts = async () => {
  // https://qiita.com/xx2xyyy/items/9116d52d6dfd4f3549ef
  const allPosts = (await getAllMDXSlugs({}))
    .map((slug) => getMDXExistence(slug))
    .flatMap((mdx) => (mdx.exists ? mdx : []))

  const rawFrontMatters = await Promise.all(
    allPosts.map((mdx) => getMDXFrontMatter(mdx.fileName, mdx.extension))
  )
  const FrontMatters = rawFrontMatters.sort((a, b) => {
    return a.date < b.date ? 1 : -1
  })

  return (
    <div className={styles['post-grid']}>
      {FrontMatters.map((metaData) => (
        <ArticleCard key={metaData.title} {...metaData} />
      ))}
    </div>
  )
}

export default RecentPosts
