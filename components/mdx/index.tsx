import React from 'react'
import { FaGithub, FaLink, FaTwitter } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { SiMisskey } from 'react-icons/si'

import ArticleCard from '@/app/blog/components/card/articleCard'
import SpotifyCard from '@/app/blog/components/card/spotifyCard'
import TextCard from '@/app/blog/components/card/textCard'
import TimelineCard from '@/app/blog/components/card/timelineCard'
import TweetCard from '@/app/blog/components/card/tweetCard'
import YouTubeCard from '@/app/blog/components/card/youTubeCard'
import WithBudoux from '@/components/common/budoux'
import Message from '@/components/common/message'
import ResponsiveIframe from '@/components/common/responsiveIframe'
import MDXHeading from '@/components/mdx/heading'
import MDXImage from '@/components/mdx/image'
import MDXLink from '@/components/mdx/link'
import Spoiler from '@/components/utils/spoiler'

const replaceComponents = {
  a: (props: React.ComponentProps<'a'>) => (
    <MDXLink {...props}>{props.children}</MDXLink>
  ),
  // p: (props: React.ComponentProps<'p'>) => (
  //   <p>
  //     <WithBudoux {...props}>{props.children}</WithBudoux>
  //   </p>
  // ),
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
  WithBudoux,
  ResponsiveIframe,
  Spoiler,
}

const iconComponents = {
  FaLink,
  FaGithub,
  FaTwitter,
  FiMail,
  SiMisskey,
}
// list of Custom Components used in mdx
export const MDXComponents = {
  ...replaceComponents,
  ...customComponents,
  ...iconComponents,
}
