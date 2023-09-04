import Image from 'next/image'

import styles from '@/app/blog/components/post-grid-element.module.scss'
import type { BlogFrontMatter } from '@/app/blog/lib/mdx'
import WithBudoux from '@/components/common/budoux'
import Link from '@/components/common/link'
import type { MDX } from '@/lib/mdx'
import { formatDateInJST } from '@/utils/date'

const PostGridElement = ({
  fileMetaData: file,
  frontMatter: { title, created: date, thumbnail },
}: MDX<BlogFrontMatter>) => {
  return (
    <Link
      className={styles.link}
      href={`/blog/post/${file.fileName}`}
      options={{ textDecoration: 'none' }}
    >
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
        <span>{formatDateInJST(date, { format: 'yyyy/MM/dd' })}</span>
        <span className={styles.title}>
          <WithBudoux>{title}</WithBudoux>
        </span>
      </div>
    </Link>
  )
}

export default PostGridElement
