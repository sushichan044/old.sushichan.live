import NextImage from '@/components/image/nextImage'
import styles from '@/components/mdx/image.module.scss'

export type MDXImageProps = {
  src: string
  alt?: string
  width: number
  height: number
  blurDataURL: string
}

const MDXImage = ({ src, alt = '', width, height }: MDXImageProps) => {
  return (
    <figure className={styles.container}>
      <NextImage
        alt={alt}
        className={styles.image}
        height={height}
        src={src}
        width={width}
      />
      {alt !== '' && <figcaption className={styles.caption}>{alt}</figcaption>}
    </figure>
  )
}

export default MDXImage
