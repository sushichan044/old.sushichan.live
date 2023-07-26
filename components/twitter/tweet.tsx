import { TweetBase } from '@/components/twitter/tweetBase'
import { TwitterTheme } from '@/components/twitter/twitterTheme'
import type { TweetProps } from '@/components/twitter/types'

const Tweet = ({ id, theme }: TweetProps) => {
  return (
    <>
      {theme === undefined ? (
        <div>
          <TweetBase id={id} />
        </div>
      ) : (
        <TwitterTheme asChild theme={theme}>
          <div>
            <TweetBase id={id} />
          </div>
        </TwitterTheme>
      )}
    </>
  )
}

export { Tweet }
