'use client'

import YouTube from 'react-youtube'

import styles from '@/app/blog/components/card/youtube-card.module.scss'
import EmbedCard from '@/components/common/card/embedCard'

const YouTubeCard = ({ videoId }: { videoId: string }) => {
  return (
    <EmbedCard>
      <YouTube
        className={styles.container}
        iframeClassName={styles.iframe}
        opts={{
          autoplay: 0,
          cc_lang_pref: 'ja',
        }}
        videoId={videoId}
      />
    </EmbedCard>
  )
}

export default YouTubeCard
