import styles from '@/components/mdx/frontMatter.module.scss'
import { mdxMetaData } from '@/lib/mdx'

const FrontMatter = ({ title, date, description }: mdxMetaData) => {
  return (
    <div className={styles.container} data-front-matter>
      <p>
        {new Intl.DateTimeFormat('ja-JP', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }).format(date)}
      </p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default FrontMatter
