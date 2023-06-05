import React from 'react'

import SpotifyCard from '@/app/blog/components/card/spotifyCard'
import TextCard from '@/app/blog/components/card/textCard'
import TweetCard from '@/app/blog/components/card/tweetCard'
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
  TweetCard,
  SpotifyCard,
}

// list of Custom Components used in mdx
export const MDXComponents = {
  ...replaceComponents,
  ...customComponents,
}
