import { Spotify } from 'react-spotify-embed'

import styles from '@/app/blog/components/card/spotify-card.module.scss'
import EmbedCard from '@/components/common/card/embedCard'

const SpotifyCard = ({ link }: { link: string }) => {
  return (
    <EmbedCard>
      <Spotify className={styles.card} link={link} />
    </EmbedCard>
  )
}

export default SpotifyCard
