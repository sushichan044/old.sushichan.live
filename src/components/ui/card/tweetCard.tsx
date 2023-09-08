// 'use client'

import type { CardCustomizeProps } from '@/components/base/card'
import EmbedCard from '@/components/base/card/embedCard'
import { Tweet } from '@/components/ui/twitter/tweet'

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
