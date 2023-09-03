'use client'

import { Tweet } from 'react-tweet'

import { TweetComponents } from '@/components/twitter/tweet-components'
import type { TweetProps } from '@/components/twitter/types'

const TWEET_API_URL = process.env.TWEET_API_URL

const TweetBase = ({ id }: TweetProps) => {
  if (!TWEET_API_URL) return null

  return (
    <Tweet
      apiUrl={`${TWEET_API_URL}/tweet/:id`}
      components={TweetComponents}
      id={id}
    />
  )
}

export { TweetBase }
