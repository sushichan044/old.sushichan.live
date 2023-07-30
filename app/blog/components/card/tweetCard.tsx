// 'use client'

import EmbedCard from '@/components/common/card/embedCard'
import { Tweet } from '@/components/twitter/tweet'
// import { TwitterTheme } from '@/components/twitter'
// import useClientTheme from '@/lib/hooks/useClientTheme'

const TweetCard = ({ id, caption }: { id: string; caption?: string }) => {
  // const { theme } = useClientTheme()

  return (
    <EmbedCard caption={caption}>
      <Tweet id={id} />
    </EmbedCard>
  )
}

export default TweetCard
