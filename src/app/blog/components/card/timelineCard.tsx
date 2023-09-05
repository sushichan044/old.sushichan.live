'use client'

import dynamic from 'next/dynamic'

import type { CardCustomizeProps } from '@/components/common/card'
import EmbedCard from '@/components/common/card/embedCard'
import useClientTheme from '@/hooks/useClientTheme'

const TimelineCard = ({ id, ...props }: CardCustomizeProps<{ id: string }>) => {
  const { theme } = useClientTheme()
  const TimelineEmbed = dynamic(
    () => import('@/components/twitter').then((mod) => mod.TimelineEmbed),
    {
      ssr: false,
    },
  )

  return (
    <EmbedCard {...props}>
      <TimelineEmbed id={id} theme={theme} />
    </EmbedCard>
  )
}

export default TimelineCard