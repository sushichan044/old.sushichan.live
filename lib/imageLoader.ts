import { type ImageLoaderProps } from 'next/image'

export default function cloudflareLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const optimizedSrc = src.replace('/public', '')

  const params = [
    `width=${width}`,
    `quality=${quality || 75}`,
    'format=auto',
    'fit=scale-down',
  ]
  return `${optimizedSrc}/${params.join(',')}`
}
