import type { CardCustomizeProps } from '@/components/base/card'
import EmbedCard from '@/components/base/card/embedCard'
import UrlPlayer from '@/components/ui/embed/player/urlPlayer'

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
