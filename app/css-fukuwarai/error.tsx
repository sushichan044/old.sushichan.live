'use client'

import FullHeightMainContainer from '@/components/common/fullHeightMainContainer'
import ServerError from '@/components/error/serverError'
import FullScreenSection from '@/components/section/fullScreenSection'

export default function Page() {
  return (
    <FullHeightMainContainer>
      <FullScreenSection>
        <ServerError />
      </FullScreenSection>
    </FullHeightMainContainer>
  )
}
