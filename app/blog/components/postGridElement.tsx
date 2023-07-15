import Image from 'next/image'
import Link from 'next/link'

import styles from '@/app/blog/components/post-grid-element.module.scss'
import type { BlogFrontMatter } from '@/app/blog/lib/mdx'
import WithBudoux from '@/components/common/budoux'
import { convertDate } from '@/lib/date'
import type { MDX } from '@/lib/mdx/next'

const PostGridElement = ({
  fileMetaData: file,
  frontMatter: { title, created: date, thumbnail },
}: MDX<BlogFrontMatter>) => {
  return (
    <Link className={styles.link} href={`/blog/post/${file.fileName}`}>
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          {thumbnail && (
            <Image
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={thumbnail}
            />
          )}
        </div>
        <span>{convertDate(date)}</span>
        <span className={styles.title}>
          <WithBudoux>{title}</WithBudoux>
        </span>
      </div>
    </Link>
  )
}

export default PostGridElement
