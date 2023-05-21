'use client'

import Image, { type ImageProps } from 'next/image'

import cloudflareLoader from '@/lib/imageLoader'

const NextImage = ({
  alt,
  width,
  height,
  src,
  ...props
}: Omit<ImageProps, 'src' | 'width' | 'height'> & {
  src: string
  width: number
  height: number
}) => {
  const optimizedSrc = src.substring(0, src.lastIndexOf('/'))

  const maxHeight = 800
  if (height > maxHeight) {
    width = (width / height) * maxHeight
    height = maxHeight
  }

  return (
    <Image
      alt={alt}
      blurDataURL={`${optimizedSrc}/width=${width},blur=250,fit=scale-down,metadata=none,quality=20`}
      height={height}
      loader={cloudflareLoader}
      placeholder="blur"
      src={optimizedSrc}
      width={width}
      {...props}
    />
  )
}

export default NextImage
