import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import WithBudoux from '@/components/common/budoux'
import ResponsiveIframe from '@/components/common/responsiveIframe'
import MDXHeading from '@/components/mdx/heading'
import MDXImage from '@/components/mdx/image'
import MDXLink from '@/components/mdx/link'
import PlayerCard from '@/components/ui/card/playerCard'
import SpotifyCard from '@/components/ui/card/spotifyCard'
import TextCard from '@/components/ui/card/textCard'
import TimelineCard from '@/components/ui/card/timelineCard'
import TweetCard from '@/components/ui/card/tweetCard'
import UrlCard from '@/components/ui/card/urlCard'
import Message from '@/components/ui/message'
import Accordion from '@/components/utils/accordion'
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
  TextCard,
  TweetCard,
  TimelineCard,
  SpotifyCard,
  PlayerCard,
  WithBudoux,
  ResponsiveIframe,
  Spoiler,
  Accordion,
  UrlCard,
}

const iconComponents = {
  FontAwesomeIcon,
}
// list of Custom Components used in mdx
export const MDXComponents = {
  ...replaceComponents,
  ...customComponents,
  ...iconComponents,
}
