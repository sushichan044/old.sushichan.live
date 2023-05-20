import Image from 'next/image'

import styles from '@/components/blog/front-matter.module.scss'
import { convertDate } from '@/lib/date'
import { type mdxMetaDataWithFile } from '@/lib/mdx'

const FrontMatter = ({
  title,
  date,
  description,
  thumbnail,
}: mdxMetaDataWithFile) => {
  return (
    <div className={styles.container}>
      <span>
        <p>{convertDate(date)}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </span>
      {thumbnail && (
        <div className={styles.thumbnail}>
          <Image alt={title} fill src={thumbnail} />
        </div>
      )}
    </div>
  )
}

export default FrontMatter
