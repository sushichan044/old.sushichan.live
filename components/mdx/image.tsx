import Link from '@/components/common/link'
import CloudinaryImage from '@/components/image/cloudinary'
import styles from '@/components/mdx/image.module.scss'
import { getCloudinaryIdentifier } from '@/lib/imageLoader'

export type MDXImageProps = {
  src: string
  alt?: string
  width: number
  height: number
  blurDataURL: string
}

const MDXImage = ({ src, alt = '', width, height }: MDXImageProps) => {
  const imageId = getCloudinaryIdentifier(src)
  const altIsEmpty = alt === '' || alt === undefined

  // TODO: mdxを使う部分をすべて(mdx)に集約して@modalの制約をなくす
  return (
    <div className={styles.container}>
      {alt === 'mdx-config-no-link' ? (
        <figure className={styles.figure}>
          <CloudinaryImage
            alt={altIsEmpty ? '' : alt}
            className={styles.image}
            height={height}
            src={src}
            width={width}
          />
        </figure>
      ) : (
        <Link href={`/blog/image/${imageId}`}>
          <figure className={styles.figure}>
            <CloudinaryImage
              alt={altIsEmpty ? '' : alt}
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
