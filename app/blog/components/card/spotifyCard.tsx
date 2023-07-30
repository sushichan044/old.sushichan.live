import clsx from 'clsx'
import { Spotify } from 'react-spotify-embed'

import styles from '@/app/blog/components/card/spotify-card.module.scss'
import type { CardCustomizeProps } from '@/components/common/card'
import EmbedCard from '@/components/common/card/embedCard'

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
      />
    </EmbedCard>
  )
}

export default SpotifyCard
