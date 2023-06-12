'use client'

import dynamic from 'next/dynamic'

import EmbedCard from '@/components/common/card/embedCard'
import { TweetEmbed } from '@/components/twitter'

const TweetCard = ({ id }: { id: string }) => {
  const MediaQuery = dynamic(() => import('react-responsive'), {
    ssr: false,
  })

  return (
    <EmbedCard shadow>
      <MediaQuery query="(prefers-color-scheme: light)">
        <TweetEmbed id={id} theme="light" />
      </MediaQuery>
      <MediaQuery query="(prefers-color-scheme: dark)">
        <TweetEmbed id={id} theme="dark" />
      </MediaQuery>
    </EmbedCard>
  )
}

export default TweetCard
