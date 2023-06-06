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
    <div className={styles.container}>
      <Link href={`/blog/image/${imageId}`}>
        <figure className={styles.figure}>
          <NextImage
            alt={altIsEmpty ? 'image' : alt}
            className={styles.image}
            height={height}
            src={src}
            width={width}
          />{' '}
        </figure>{' '}
      </Link>
      {!altIsEmpty && <figcaption className={styles.caption}>{alt}</figcaption>}
    </div>
  )
}

export default MDXImage
