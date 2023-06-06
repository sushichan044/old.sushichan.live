'use client'

import dynamic from 'next/dynamic'

import EmbedCard from '@/components/common/card/embedCard'
import { TimelineEmbed } from '@/components/twitter'

const TimelineCard = ({ id }: { id: string }) => {
  const MediaQuery = dynamic(() => import('react-responsive'), {
    ssr: false,
  })

  return (
    <EmbedCard>
      <MediaQuery query="(prefers-color-scheme: light)">
        <TimelineEmbed id={id} theme="light" />
      </MediaQuery>
      <MediaQuery query="(prefers-color-scheme: dark)">
        <TimelineEmbed id={id} theme="dark" />
      </MediaQuery>
    </EmbedCard>
  )
}

export default TimelineCard
