import clsx from 'clsx'
import React from 'react'

import WithBudoux from '@/components/common/budoux'
import s from '@/components/mdx/heading.module.scss'

type HeadingProps = {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & React.ComponentProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>

const MDXHeading = ({ level, children, className, ...props }: HeadingProps) => {
  const Component = level
  return (
    <Component className={clsx(s.heading, className && className)} {...props}>
      {typeof children !== 'string' ? (
        children
      ) : (
        <WithBudoux>{children}</WithBudoux>
      )}
    </Component>
  )
}

export default MDXHeading
