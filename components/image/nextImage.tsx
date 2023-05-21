'use client'

import Image, { type ImageProps } from 'next/image'

import useAdjustedSize from '@/lib/hooks/adjustSize'

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
  const optimizedSize = useAdjustedSize(width, height, 'width')

  return (
    <Image
      alt={alt}
      blurDataURL={`${optimizedSrc}/width=${optimizedSize.width},blur=250,fit=scale-down,metadata=none,quality=20`}
      height={optimizedSize.height}
      placeholder="blur"
      src={`${optimizedSrc}/width=${optimizedSize.width},fit=scale-down,metadata=none,quality=75`}
      width={optimizedSize.width}
      {...props}
    />
  )
}

export default NextImage
