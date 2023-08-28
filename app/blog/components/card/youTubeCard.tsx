'use client'
import dynamic from 'next/dynamic'

import styles from '@/app/blog/components/card/youtube-card.module.scss'
import type { CardCustomizeProps } from '@/components/common/card'
import EmbedCard from '@/components/common/card/embedCard'

const YouTubeCard = ({
  url,
  ...props
}: CardCustomizeProps<{
  url: string
}>) => {
  const YouTubeLazy = dynamic(() => import('react-player/lazy'), {
    ssr: false,
  })

  const youtubeProps = (() => {
    const videoRegex = /https:\/\/www\.youtube\.com\/watch\?.*v=(?<id>[^&]+)/
    const playlistRegex =
      /https:\/\/www\.youtube\.com\/playlist\?.*list=(?<id>[^&]+)/

    const baseConfig = {
      embedOptions: {
        autoplay: 0,
        cc_lang_pref: 'ja',
      },
    }

    if (videoRegex.test(url)) {
      return baseConfig
    }

    if (playlistRegex.test(url)) {
      const { groups } = playlistRegex.exec(url) ?? {}

      return {
        ...baseConfig,
        playerVars: { listType: 'playlist', list: groups?.id },
      }
    }
  })()

  return (
    <EmbedCard shadow {...props}>
      <YouTubeLazy
        className={styles.container}
        config={{ youtube: { ...youtubeProps } }}
        height="100%"
        url={url}
        width="100%"
      />
    </EmbedCard>
  )
}

export default YouTubeCard
