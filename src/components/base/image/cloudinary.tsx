'use client'

import Image, { type ImageProps } from 'next/image'

import { cloudinaryLoader, cloudinaryLoaderBlur } from '@/lib/imageLoader'

const CloudinaryImage = ({
  src,
  alt = '',
  width,
  height,
  quality,
  ...props
}: Omit<ImageProps, 'src' | 'width' | 'height' | 'fill' | 'quality'> & {
  src: string
  width: number
  height: number
  quality?: number
}) => {
  const maxWidth = 960
  if (width > maxWidth) {
    height *= maxWidth / width
    width = maxWidth
  }
  const blurDataURL = cloudinaryLoaderBlur({
    src,
    width,
    quality,
  })

  return (
    <Image
      alt={alt}
      blurDataURL={blurDataURL}
      height={height}
      loader={cloudinaryLoader}
      placeholder="blur"
      sizes="(max-width: 768px) 100vw, 50vw"
      src={src}
      width={width}
      {...props}
    />
  )
}

export default CloudinaryImage
