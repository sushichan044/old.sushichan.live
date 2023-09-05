import Image from 'next/image'

import styles from '@/app/blog/components/card/article-card.module.scss'
import { blogFrontMatterSchema } from '@/app/blog/lib/mdx'
import WithBudoux from '@/components/common/budoux'
import type { CardCustomizeProps } from '@/components/common/card'
import Card from '@/components/common/card'
import Link from '@/components/common/link'
import { getMDX, type PartialMDXFileMetaData } from '@/lib/mdx'

type ArticleCardProps = {
  href: string
} & PartialMDXFileMetaData

const ArticleCard = ({
  sourceDirectory,
  fileName,
  extension,
  href,
  ...props
}: CardCustomizeProps<ArticleCardProps>) => {
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
    <Card className={styles.root} {...props}>
      {/* @ts-expect-error validate href is not able */}
      <Link href={href} options={{ textDecoration: 'none' }}>
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