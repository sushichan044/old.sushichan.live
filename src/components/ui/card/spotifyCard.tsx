import clsx from 'clsx'
import { Spotify } from 'react-spotify-embed'

import type { CardCustomizeProps } from '@/components/base/card'
import EmbedCard from '@/components/base/card/embedCard'
import styles from '@/components/ui/card/spotify-card.module.scss'

const SpotifyCard = ({
  url,
  shape = 'wide',
  ...props
}: CardCustomizeProps<{
  url: string
  shape: 'wide' | 'square'
}>) => {
  return (
    <EmbedCard shadow {...props}>
      <Spotify
        className={clsx(shape === 'wide' ? styles.wide : styles.square)}
        link={url}
        loading="lazy"
      />
    </EmbedCard>
  )
}

export default SpotifyCard
