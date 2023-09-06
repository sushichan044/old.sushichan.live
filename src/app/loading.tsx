import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import FullScreenSection from '@/components/base/section/fullScreenSection'
import FullHeightMainContainer from '@/components/common/fullHeightMainContainer'

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
