import { Spotify } from 'react-spotify-embed'

import styles from '@/app/blog/components/card/spotify-card.module.scss'
import EmbedCard from '@/components/common/card/embedCard'

const SpotifyCard = ({ url }: { url: string }) => {
  return (
    <EmbedCard shadow>
      <Spotify className={styles.card} link={url} />
    </EmbedCard>
  )
}

export default SpotifyCard
