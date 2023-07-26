import { Tweet } from 'react-tweet'

import { TweetComponents } from '@/components/twitter/tweet-components'
import type { TweetProps } from '@/components/twitter/types'

const TweetBase = ({ id }: TweetProps) => {
  return <Tweet components={TweetComponents} id={id} />
}

export { TweetBase }
