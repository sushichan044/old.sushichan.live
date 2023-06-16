'use client'

import YouTube from 'react-youtube'

import styles from '@/app/blog/components/card/youtube-card.module.scss'
import EmbedCard from '@/components/common/card/embedCard'

const YouTubeCard = ({
  id,
  type,
}: {
  id: string
  type: 'video' | 'playlist'
}) => {
  const youtubeProps = ((type: 'video' | 'playlist') => {
    if (type === 'video') {
      return {
        opts: {
          autoplay: 0,
          cc_lang_pref: 'ja',
        },
        videoId: id,
      }
    }

    if (type === 'playlist') {
      return {
        opts: {
          autoplay: 0,
          cc_lang_pref: 'ja',
          playerVars: { listType: 'playlist', list: id },
        },
      }
    }

    return
  })(type)

  return (
    <EmbedCard shadow>
      <YouTube
        className={styles.container}
        iframeClassName={styles.iframe}
        loading="lazy"
        {...youtubeProps}
      />
    </EmbedCard>
  )
}

export default YouTubeCard
