// 'use client'

import { Tweet } from 'react-tweet'

import EmbedCard from '@/components/common/card/embedCard'
// import { TwitterTheme } from '@/components/twitter'
// import useClientTheme from '@/lib/hooks/useClientTheme'

const TweetCard = ({ id }: { id: string }) => {
  // const { theme } = useClientTheme()

  return (
    // <TwitterTheme asChild theme={theme}>
    <EmbedCard>
      <Tweet id={id} />
    </EmbedCard>
    // </TwitterTheme>
  )
}

export default TweetCard
