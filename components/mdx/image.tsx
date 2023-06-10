import Link from 'next/link'

import NextImage from '@/components/image/nextImage'
import styles from '@/components/mdx/image.module.scss'
import getImageId from '@/lib/getImageId'

export type MDXImageProps = {
  src: string
  alt?: string
  width: number
  height: number
  blurDataURL: string
}

const MDXImage = ({ src, alt = '', width, height }: MDXImageProps) => {
  const imageId = getImageId(src)
  const altIsEmpty = alt === '' || alt === undefined

  // TODO: mdxを使う部分をすべて(mdx)に集約して@modalの制約をなくす
  return (
    <div className={styles.container}>
      {alt === 'mdx-config-no-link' ? (
        <figure className={styles.figure}>
          <NextImage
            alt={altIsEmpty ? 'image' : alt}
            className={styles.image}
            height={height}
            src={src}
            width={width}
          />
        </figure>
      ) : (
        <Link href={`/blog/image/${imageId}`}>
          <figure className={styles.figure}>
            <NextImage
              alt={altIsEmpty ? 'image' : alt}
              className={styles.image}
              height={height}
              src={src}
              width={width}
            />
          </figure>
        </Link>
      )}

      {!altIsEmpty && !alt.startsWith('mdx-config') && (
        <figcaption className={styles.caption}>{alt}</figcaption>
      )}
    </div>
  )
}

export default MDXImage
