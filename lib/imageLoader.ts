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

const normalizeSrc = (src: string) => (src[0] === '/' ? src.slice(1) : src)

const loader = ({
  src,
  width,
  quality,
  blur = false,
}: ImageLoaderProps & {
  blur?: boolean
}) => {
  const params = ['f_auto', 'c_limit', `w=${width}`, `q=${quality || 'auto'}`]
  if (blur) params.push('e=blur:800')
  return `https://res.cloudinary.com/sushi-chan/image/upload/${params.join(
    ','
  )}/${normalizeSrc(src)}`
}

export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  return loader({ src, width, quality })
}

export function cloudinaryLoaderBlur({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  return loader({ src, width, quality, blur: true })
}
