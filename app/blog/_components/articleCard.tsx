import Image from 'next/image'
import Link from 'next/link'

import styles from '@/app/blog/_components/article-card.module.scss'
import WithBudoux from '@/components/common/budoux'
import { convertDate } from '@/lib/date'
import { type mdxMetaDataWithFile } from '@/lib/mdx'

const ArticleCard = ({
  title,
  date,
  thumbnail,
  file,
}: Omit<mdxMetaDataWithFile, 'description'>) => {
  return (
    <Link className={styles.link} href={`/blog/post/${file.fileName}`}>
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          {thumbnail && (
            <Image
              alt={title}
              fill
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

export default ArticleCard