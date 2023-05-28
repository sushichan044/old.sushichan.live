import { GiSushis } from 'react-icons/gi'

import FullHeightMainContainer from '@/components/common/fullHeightMainContainer'
import FullScreenSection from '@/components/section/fullScreenSection'

export default function Page() {
  return (
    <FullHeightMainContainer>
      <FullScreenSection>
        <GiSushis size="40%" />
        <p>Now Loading...</p>
      </FullScreenSection>
    </FullHeightMainContainer>
  )
}
