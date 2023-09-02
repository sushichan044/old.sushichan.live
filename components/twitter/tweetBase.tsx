import { Tweet } from 'react-tweet'

import { TweetComponents } from '@/components/twitter/tweet-components'
import type { TweetProps } from '@/components/twitter/types'

const TweetBase = ({ id }: TweetProps) => {
  return <Tweet apiUrl='https://tweet-backend.sushichan.live/:id' components={TweetComponents} id={id} />
}

export { TweetBase }
