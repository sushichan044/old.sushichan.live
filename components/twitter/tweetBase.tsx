import { EmbeddedTweet } from 'react-tweet'

import { TweetComponents } from '@/components/twitter/tweet-components'
import type { TweetProps } from '@/components/twitter/types'

const TWEET_API_URL = process.env.TWEET_API_URL

const TweetBase = async ({ id }: TweetProps) => {
  if (!TWEET_API_URL) return <></>

  try {
    const res = await fetch(`${TWEET_API_URL}/tweet/${id}`)
    const isJson = res.headers.get('content-type')?.includes('application/json')
    const data = isJson ? await res.json() : undefined
    if (res.ok) {
      return <EmbeddedTweet components={TweetComponents} tweet={data} />
    }
  } catch (e) {
    console.error(e)
    return <></>
  }

  return <></>
}

export { TweetBase }
