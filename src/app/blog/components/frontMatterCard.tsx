import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

import styles from '@/app/blog/components/front-matter.module.scss'
import Tag from '@/app/blog/components/tag'
import type { BlogFrontMatter } from '@/app/blog/lib/mdx'
import Link from '@/components/base/link'
import WithBudoux from '@/components/common/budoux'
import type { MDX } from '@/lib/mdx'
import { formatDateInJST } from '@/utils/date'

const FrontMatterCard = ({
  frontMatter: { title, created, updated, description, thumbnail, tags },
}: MDX<BlogFrontMatter>) => {
  return (
    <div className={styles.container}>
      {thumbnail && (
        <div className={styles.thumbnail}>
          <Image
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={thumbnail}
          />
        </div>
      )}
      <div className={styles.heading}>
        <h1>
          <WithBudoux>{title}</WithBudoux>
        </h1>
        {/* TODO: descriptionのCSSを書く(位置調整など) */}
        <span>
          <p>
            <WithBudoux>{description}</WithBudoux>
          </p>
        </span>
        <div className={styles['date-container']}>
          <span className={styles.date}>
            <FontAwesomeIcon icon={['fas', 'pen']} size="1x" />
            <p>{formatDateInJST(created, { format: 'yyyy/MM/dd' })}</p>
          </span>
          {updated && (
            <span className={styles.date}>
              <FontAwesomeIcon icon={['fas', 'arrow-rotate-right']} size="1x" />
              <p>{formatDateInJST(updated, { format: 'yyyy/MM/dd' })}</p>
            </span>
          )}
        </div>
        {tags && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Link
                href={`/blog/tag/${tag}`}
                key={tag}
                options={{ textDecoration: 'none' }}
              >
                <Tag key={tag} tag={tag} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FrontMatterCard
