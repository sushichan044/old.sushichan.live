'use client'

import { useMediaQuery } from 'react-responsive'
import { TwitterTweetEmbed } from 'react-twitter-embed'

import EmbedCard from '@/components/common/card/embedCard'

const TweetCard = ({ id }: { id: string }) => {
  const isDark = useMediaQuery({ query: '(prefers-color-scheme: dark)' })

  return (
    <EmbedCard>
      <TwitterTweetEmbed
        options={{ theme: `${isDark ? 'dark' : 'light'}` }}
        tweetId={id}
      />
    </EmbedCard>
  )
}

export default TweetCard
