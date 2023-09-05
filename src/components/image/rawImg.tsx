type Props = {
  src: string
  alt?: string
  className?: string
  width: number
  height: number
}

const RawImg = ({ alt, ...props }: Props) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt || ''} decoding="async" loading="lazy" {...props} />
}

const RawImgWithoutSize = ({
  alt,
  ...props
}: Omit<Props, 'width' | 'height'>) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt || ''} decoding="async" loading="lazy" {...props} />
}

export { RawImg, RawImgWithoutSize }
