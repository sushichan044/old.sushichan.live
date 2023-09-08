import Posts from '@/app/blog/components/posts'
import Tags from '@/app/blog/components/tags'
import { getAllBlogMDX, getAllBlogTags } from '@/app/blog/lib/mdx'
import styles from '@/app/blog/page.module.scss'
import Section from '@/components/base/section'

export default async function Page() {
  const allMDX = getAllBlogMDX()
  const tags = getAllBlogTags(allMDX)

  return (
    <>
      <Section className={styles.description}>
        <h1>雑記</h1>
        <p>文字を書きます。内容はいろいろ</p>
        <div className={styles.tags}>
          <Tags tags={tags} />
        </div>
        <Posts mdx={allMDX} />
      </Section>
    </>
  )
}
