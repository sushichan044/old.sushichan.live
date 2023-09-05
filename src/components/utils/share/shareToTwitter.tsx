import { Slot } from '@radix-ui/react-slot'
import Link from 'next/link'

import type { PropsWithAsChild } from '@/utils/@types/propsAsChild'
import { getNormalizedTweetUrl, TweetData } from '@/utils/twitter'

const ShareToTwitter = ({
  asChild,
  ...props
}: PropsWithAsChild<TweetData, typeof Link>) => {
  const Component = asChild ? Slot : Link
  const tweet = getNormalizedTweetUrl(props)

  return (
    <Component href={new URL(tweet)} role="link" target="_blank" {...props} />
  )
}

export default ShareToTwitter
