import React from 'react'

import TextCard from '@/app/blog/components/textCard'
import Message from '@/components/common/message'
import MDXImage from '@/components/mdx/image'
import MDXLink from '@/components/mdx/link'

// list of Custom Components used in mdx
export const customComponents = {
  a: (props: React.ComponentProps<'a'>) => (
    <MDXLink {...props}>{props.children}</MDXLink>
  ),
  // FIXME: 型パズルに敗北...
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: (props: any) => <MDXImage {...props} />,
  Message,
  TextCard,
}
