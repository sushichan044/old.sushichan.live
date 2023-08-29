import type { CardCustomizeProps } from '@/components/common/card'
import EmbedCard from '@/components/common/card/embedCard'
import UrlPlayer from '@/components/embed/player/urlPlayer'

const PlayerCard = ({
  url,
  ...props
}: CardCustomizeProps<{
  url: string
}>) => {
  return (
    <EmbedCard shadow {...props}>
      <UrlPlayer light url={url} />
    </EmbedCard>
  )
}

export default PlayerCard
