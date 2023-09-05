import { type ImageLoaderProps } from 'next/image'

export function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
  const optimizedSrc = src.replace('/public', '')

  const params = [
    `width=${width}`,
    `quality=${quality || 75}`,
    'format=auto',
    'fit=scale-down',
  ]
  return `${optimizedSrc}/${params.join(',')}`
}

export const getCloudinaryIdentifier = (src: string) => {
  return src.replace('https://res.cloudinary.com/sushi-chan/image/upload/', '')
}

const cloudinaryLoaderBase = ({
  src,
  width,
  quality,
  blur = false,
}: ImageLoaderProps & {
  blur?: boolean
}) => {
  // src = https://res.cloudinary.com/sushi-chan/image/upload/v1689696723/blog/my-first-walk/b1iajynl60c0uvmdapfi.jpg
  const imageIdentifier = getCloudinaryIdentifier(src)
  const params = [
    'f_auto',
    'c_limit',
    `w_${width}`,
    `q_${quality || 'auto'}`,
    'f_webp',
  ]
  if (blur) params.push('e_blur:1600')
  return `https://res.cloudinary.com/sushi-chan/image/upload/${params.join(
    ',',
  )}/${imageIdentifier}`
}

export const cloudinaryMetadataLoader = (src: string) => {
  const imageIdentifier = getCloudinaryIdentifier(src)
  return `https://res.cloudinary.com/sushi-chan/image/upload/fl_getinfo/${imageIdentifier}`
}

export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  return cloudinaryLoaderBase({ src, width, quality })
}

export function cloudinaryLoaderBlur({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  return cloudinaryLoaderBase({ src, width, quality, blur: true })
}
