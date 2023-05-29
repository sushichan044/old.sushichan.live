import { GiSushis } from 'react-icons/gi'

import styles from '@/app/not-found.module.scss'
import BackButton from '@/components/button/backButton'
import FullHeightMainContainer from '@/components/common/fullHeightMainContainer'
import FullScreenSection from '@/components/section/fullScreenSection'

export default function Page() {
  return (
    <FullHeightMainContainer>
      <FullScreenSection>
        <GiSushis className={styles.logo} />
        <p>404 Not Found</p>
        <BackButton />
      </FullScreenSection>
    </FullHeightMainContainer>
  )
}
