import Image from 'next/image'
import Link from 'next/link'

import styles from '@/components/blog/front-matter.module.scss'
import Tag from '@/components/blog/tag'
import { convertDate } from '@/lib/date'
import { type mdxMetaDataWithFile } from '@/lib/mdx'

const FrontMatter = ({
  title,
  date,
  description,
  thumbnail,
  tags,
}: mdxMetaDataWithFile) => {
  return (
    <div className={styles.container}>
      {thumbnail && (
        <div className={styles.thumbnail}>
          <Image alt={title} fill priority src={thumbnail} />
        </div>
      )}
      <div className={styles.heading}>
        <h1>{title}</h1>
        <p>{convertDate(date)}</p>
        {tags && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Link href={`/blog/tags/${tag}`} key={tag}>
                <Tag key={tag} tag={tag} />
              </Link>
            ))}
          </div>
        )}
        {/* TODO: descriptionのCSSを書く(位置調整など) */}
        <span>
          <p>{description}</p>
        </span>
      </div>
    </div>
  )
}

export default FrontMatter
