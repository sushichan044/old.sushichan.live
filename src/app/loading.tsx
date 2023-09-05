import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import FullHeightMainContainer from '@/components/common/fullHeightMainContainer'
import FullScreenSection from '@/components/section/fullScreenSection'

export default function Page() {
  return (
    <FullHeightMainContainer>
      <FullScreenSection>
        <FontAwesomeIcon icon={faSpinner} size="5x" spin />
        <p>Now Loading...</p>
      </FullScreenSection>
    </FullHeightMainContainer>
  )
}
