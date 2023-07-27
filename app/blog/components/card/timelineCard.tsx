'use client'

import dynamic from 'next/dynamic'

import EmbedCard from '@/components/common/card/embedCard'
import useClientTheme from '@/lib/hooks/useClientTheme'

const TimelineCard = ({ id }: { id: string }) => {
  const { theme } = useClientTheme()
  const TimelineEmbed = dynamic(
    () => import('@/components/twitter').then((mod) => mod.TimelineEmbed),
    {
      ssr: false,
    },
  )

  return (
    <EmbedCard>
      <TimelineEmbed id={id} theme={theme} />
    </EmbedCard>
  )
}

export default TimelineCard
