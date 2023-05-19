import Image from 'next/image'

export type MDXImageProps = Omit<
  React.ComponentProps<'img'>,
  'src' | 'width' | 'height' | 'placeholder' | 'ref'
> & {
  src: string
}

const MDXImage = (props: MDXImageProps) => {
  return (
    <div style={{ width: '300px', height: '200px', position: 'relative' }}>
      <Image
        alt={props.alt || ''}
        fill
        placeholder="empty"
        style={{ objectFit: 'contain' }}
        {...props}
      />
    </div>
  )
}

export default MDXImage
