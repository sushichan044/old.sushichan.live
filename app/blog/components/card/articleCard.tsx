import Image from 'next/image'
import Link from 'next/link'

import styles from '@/app/blog/components/card/article-card.module.scss'
import WithBudoux from '@/components/common/budoux'
import Card from '@/components/common/card'
import { getMDXMetaData, type MDXFile } from '@/lib/mdx'

type ArticleCardProps = {
  href: string
} & MDXFile

const ArticleCard = ({
  topDirectory,
  fileName,
  extension,
  href,
}: ArticleCardProps) => {
  const { title, thumbnail, description } = getMDXMetaData({
    topDirectory,
    fileName,
    extension,
  })

  return (
    <Card className={styles.root}>
      {/* @ts-expect-error validate href is not able */}
      <Link href={href}>
        <div className={styles.container}>
          <div className={styles.detail}>
            <p className={styles.title}>
              <WithBudoux>{title}</WithBudoux>
            </p>
            <p>{description}</p>
          </div>
          <Image
            alt={title}
            className={styles.image}
            height={120}
            src={thumbnail}
            width={120}
          />
        </div>
      </Link>
    </Card>
  )
}

export default ArticleCard
