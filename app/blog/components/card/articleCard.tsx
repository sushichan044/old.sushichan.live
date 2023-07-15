import Image from 'next/image'
import Link from 'next/link'

import styles from '@/app/blog/components/card/article-card.module.scss'
import { blogFrontMatterSchema } from '@/app/blog/lib/mdx'
import WithBudoux from '@/components/common/budoux'
import Card from '@/components/common/card'
import { getMDX, type PartialMDXFileMetaData } from '@/lib/mdx/next'

type ArticleCardProps = {
  href: string
} & PartialMDXFileMetaData

const ArticleCard = ({
  sourceDirectory,
  fileName,
  extension,
  href,
}: ArticleCardProps) => {
  const mdx = getMDX({
    mdx: {
      sourceDirectory,
      fileName,
      extension,
    },
    schema: blogFrontMatterSchema,
  })
  if (!mdx) {
    return <></>
  }

  const { title, description, thumbnail } = mdx.frontMatter

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
