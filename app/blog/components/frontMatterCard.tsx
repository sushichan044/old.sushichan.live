import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineUpdate } from 'react-icons/md'
import { TbPencil } from 'react-icons/tb'

import styles from '@/app/blog/components/front-matter.module.scss'
import Tag from '@/app/blog/components/tag'
import WithBudoux from '@/components/common/budoux'
import { convertDate } from '@/lib/date'
import { type FrontMatter } from '@/lib/mdx'

const FrontMatterCard = ({
  title,
  date,
  updated,
  description,
  thumbnail,
  tags,
}: FrontMatter) => {
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
          <p>{description}</p>
        </span>
        <div className={styles['date-container']}>
          <span className={styles.date}>
            <TbPencil size="1.5em" />
            <p>{convertDate(date)}</p>
          </span>
          {updated && (
            <span className={styles.date}>
              <MdOutlineUpdate size="1.5em" />
              <p>{convertDate(updated)}</p>
            </span>
          )}
        </div>
        {tags && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Link href={`/blog/tags/${tag}`} key={tag}>
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
