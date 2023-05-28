import { GiSushis } from 'react-icons/gi'

import BackButton from '@/components/common/backButton'
import FullHeightMainContainer from '@/components/common/fullHeightMainContainer'
import FullScreenSection from '@/components/section/fullScreenSection'

export default function Page() {
  return (
    <FullHeightMainContainer>
      <FullScreenSection>
        <GiSushis size="25%" />
        <p>404 Not Found</p>
        <BackButton />
      </FullScreenSection>
    </FullHeightMainContainer>
  )
}
