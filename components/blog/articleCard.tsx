import Image from 'next/image'
import Link from 'next/link'

import styles from '@/components/blog/article-card.module.scss'
import { convertDate } from '@/lib/date'
import { type mdxMetaDataWithFile } from '@/lib/mdx'

const ArticleCard = ({
  title,
  date,
  image,
  file,
}: Omit<mdxMetaDataWithFile, 'description'>) => {
  return (
    <Link className={styles.link} href={`/blog/post/${file.fileName}`}>
      <div className={styles.card}>
        <span className={styles.title}>{title}</span>
        <div className={styles.thumbnail}>
          {image && <Image alt={title} fill src={image} />}{' '}
        </div>

        <span>{convertDate(date)}</span>
      </div>
    </Link>
  )
}

export default ArticleCard