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
  const maxHeight = 800
  if (height > maxHeight) {
    width = (width / height) * maxHeight
    height = maxHeight
  }

  return (
    <Image
      alt={alt}
      blurDataURL={cloudinaryLoaderBlur({
        src,
        width,
        quality,
      })}
      height={height}
      loader={cloudinaryLoader}
      placeholder="blur"
      src={src}
      width={width}
      {...props}
    />
  )
}

export default CloudinaryImage
