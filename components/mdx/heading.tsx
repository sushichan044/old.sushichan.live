import React from 'react'

import WithBudoux from '@/components/common/budoux'

type HeadingProps = {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & React.ComponentProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>

const MDXHeading = ({ level, children, ...props }: HeadingProps) => {
  const Component = level
  return (
    <Component {...props}>
      {typeof children !== 'string' ? (
        children
      ) : (
        <WithBudoux>{children}</WithBudoux>
      )}
    </Component>
  )
}

export default MDXHeading
