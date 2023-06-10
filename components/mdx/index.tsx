import React from 'react'

import ArticleCard from '@/app/blog/components/card/articleCard'
import SpotifyCard from '@/app/blog/components/card/spotifyCard'
import TextCard from '@/app/blog/components/card/textCard'
import TimelineCard from '@/app/blog/components/card/timelineCard'
import TweetCard from '@/app/blog/components/card/tweetCard'
import YouTubeCard from '@/app/blog/components/card/youTubeCard'
import Message from '@/components/common/message'
import MDXHeading from '@/components/mdx/heading'
import MDXImage from '@/components/mdx/image'
import MDXLink from '@/components/mdx/link'

const replaceComponents = {
  a: (props: React.ComponentProps<'a'>) => (
    <MDXLink {...props}>{props.children}</MDXLink>
  ),
  // FIXME: 型パズルに敗北...
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: (props: any) => <MDXImage {...props} />,
  h2: (props: React.ComponentProps<'h2'>) => (
    <MDXHeading level="h2" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <MDXHeading level="h3" {...props} />
  ),
  h4: (props: React.ComponentProps<'h4'>) => (
    <MDXHeading level="h4" {...props} />
  ),
  h5: (props: React.ComponentProps<'h5'>) => (
    <MDXHeading level="h5" {...props} />
  ),
  h6: (props: React.ComponentProps<'h6'>) => (
    <MDXHeading level="h6" {...props} />
  ),
}

const customComponents = {
  Message,
  ArticleCard,
  TextCard,
  TweetCard,
  TimelineCard,
  SpotifyCard,
  YouTubeCard,
}

// list of Custom Components used in mdx
export const MDXComponents = {
  ...replaceComponents,
  ...customComponents,
}
