import clsx from 'clsx'
import React from 'react'

import s from '@/components/common/with-caption.module.scss'

type WithCaptionProps = React.ComponentProps<'div'> & {
  caption?: string
  isFigure: boolean
}

const WithCaption = ({
  children,
  className,
  caption,
  isFigure,
  ...props
}: WithCaptionProps) => {
  const CaptionTag = isFigure ? 'figcaption' : 'p'

  return (
    <div className={clsx(s.root, className && className)} {...props}>
      {children}
      {caption && <CaptionTag className={s.caption}>{caption}</CaptionTag>}
    </div>
  )
}

export default WithCaption
