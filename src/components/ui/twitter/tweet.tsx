import s from '@/components/ui/twitter/tweet.module.scss'
import { TweetBase } from '@/components/ui/twitter/tweetBase'
import { TwitterTheme } from '@/components/ui/twitter/twitterTheme'
import type { TweetProps } from '@/components/ui/twitter/types'

const Tweet = ({ id, theme }: TweetProps) => {
  return (
    <>
      {theme === undefined ? (
        <div className={s.root}>
          <TweetBase id={id} />
        </div>
      ) : (
        <TwitterTheme asChild theme={theme}>
          <div className={s.root}>
            <TweetBase id={id} />
          </div>
        </TwitterTheme>
      )}
    </>
  )
}

export { Tweet }
