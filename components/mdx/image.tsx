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

  return (
    <Link href={`/blog/image/${imageId}`}>
      <figure className={styles.container}>
        <NextImage
          alt={altIsEmpty ? 'image' : alt}
          className={styles.image}
          height={height}
          src={src}
          width={width}
        />
        {!altIsEmpty && (
          <figcaption className={styles.caption}>{alt}</figcaption>
        )}
      </figure>
    </Link>
  )
}

export default MDXImage
