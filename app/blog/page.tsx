import Link from 'next/link'

import RecentPosts from '@/app/blog/components/recentPosts'
import Tag from '@/app/blog/components/tag'
import { getAllBlogMDX, getAllBlogTags } from '@/app/blog/lib/mdx'
import styles from '@/app/blog/page.module.scss'
import Section from '@/components/section'

export default async function Page() {
  const allMDX = getAllBlogMDX()
  const tags = getAllBlogTags(allMDX)

  return (
    <>
      <Section className={styles.description}>
        <h1>雑記</h1>
        <p>文字を書きます。内容はいろいろ</p>
        <div className={styles.tags}>
          {tags?.map((tag) => (
            <Link href={`/blog/tag/${tag}`} key={tag}>
              <Tag key={tag} tag={tag} />
            </Link>
          ))}
        </div>
      </Section>
      <Section>
        <h2>最近書いた記事</h2>
        <RecentPosts mdx={allMDX} />
      </Section>
    </>
  )
}
