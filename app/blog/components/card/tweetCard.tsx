// 'use client'

import type { CardCustomizeProps } from '@/components/common/card'
import EmbedCard from '@/components/common/card/embedCard'
import { Tweet } from '@/components/twitter/tweet'

// import { TwitterTheme } from '@/components/twitter'
// import useClientTheme from '@/lib/hooks/useClientTheme'

const TweetCard = ({
  id,
  ...props
}: CardCustomizeProps<{ id: string; caption?: string }>) => {
  // const { theme } = useClientTheme()

  return (
    <EmbedCard {...props}>
      <Tweet id={id} />
    </EmbedCard>
  )
}

export default TweetCard
