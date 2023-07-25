'use client'

import dynamic from 'next/dynamic'

import EmbedCard from '@/components/common/card/embedCard'
import useClientTheme from '@/lib/hooks/useClientTheme'

const TweetCard = ({ id }: { id: string }) => {
  const { theme } = useClientTheme()
  const TweetEmbed = dynamic(
    () => import('@/components/twitter').then((mod) => mod.TweetEmbed),
    {
      ssr: false,
    }
  )

  return (
    <EmbedCard>
      <TweetEmbed id={id} theme={theme} />
    </EmbedCard>
  )
}

export default TweetCard
