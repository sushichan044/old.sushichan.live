import React from 'react'

import SpotifyCard from '@/app/blog/components/card/spotifyCard'
import TextCard from '@/app/blog/components/card/textCard'
import Message from '@/components/common/message'
import MDXImage from '@/components/mdx/image'
import MDXLink from '@/components/mdx/link'

const replaceComponents = {
  a: (props: React.ComponentProps<'a'>) => (
    <MDXLink {...props}>{props.children}</MDXLink>
  ),
  // FIXME: 型パズルに敗北...
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: (props: any) => <MDXImage {...props} />,
}

const customComponents = {
  Message,
  TextCard,
  SpotifyCard,
}

// list of Custom Components used in mdx
export const MDXComponents = {
  ...replaceComponents,
  ...customComponents,
}
