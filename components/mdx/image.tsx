import Image from 'next/image'

import styles from '@/components/mdx/image.module.scss'

export type MDXImageProps = {
  src: string
  alt?: string
  width: number
  height: number
  blurDataURL: string
}

const MDXImage = ({ src, alt, width, height, blurDataURL }: MDXImageProps) => {
  return (
    <div>
      <Image
        alt={alt || 'image'}
        blurDataURL={blurDataURL}
        className={styles.image}
        height={height}
        placeholder="blur"
        src={src}
        width={width}
      />
    </div>
  )
}

export default MDXImage
