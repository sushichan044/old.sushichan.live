'use client'
import 'client-only'

import dynamic from 'next/dynamic'
import { useId } from 'react'

import s from '@/components/ui/embed/player/player.module.scss'

type PlayerProps = {
  url: string
  light?: boolean
}

const UrlPlayer = ({ url, light }: PlayerProps) => {
  const twitchPlayerId = useId()
  const PlayerComponent = dynamic(() => import('react-player/lazy'), {
    ssr: false,
  })

  const youtubePlayerOptions = (() => {
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

    return baseConfig
  })()

  // TODO: support twitch thumbnail
  return (
    <PlayerComponent
      className={s.container}
      config={{
        youtube: { ...youtubePlayerOptions },
        soundcloud: {
          options: {
            autoplay: false,
          },
        },
        twitch: {
          options: {
            autoplay: false,
          },
          playerId: twitchPlayerId,
        },
      }}
      height="100%"
      light={light ?? true}
      muted
      url={url}
      volume={0.5}
      width="100%"
    />
  )
}

export default UrlPlayer
