// 'use client'

import EmbedCard from '@/components/common/card/embedCard'
import { Tweet } from '@/components/twitter/tweet'
// import { TwitterTheme } from '@/components/twitter'
// import useClientTheme from '@/lib/hooks/useClientTheme'

const TweetCard = ({ id }: { id: string }) => {
  // const { theme } = useClientTheme()

  return (
    <EmbedCard>
      <Tweet id={id} />
    </EmbedCard>
  )
}

export default TweetCard
