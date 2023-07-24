import queryString from 'query-string'

type TweetData = {
  text?: string
  url?: string
  hashtags?: string[]
  via?: string
}

const getNormalizedTweetUrl = ({ via, ...rest }: Partial<TweetData>) => {
  if (via?.startsWith('@')) {
    via = via.slice(1)
  }
  const query = { via, ...rest }

  const url = queryString.stringifyUrl(
    {
      url: 'https://twitter.com/intent/tweet',
      query,
    },
    {
      arrayFormat: 'comma',
    }
  )

  return url
}

export { getNormalizedTweetUrl, type TweetData }
