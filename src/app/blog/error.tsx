'use client'

import FullScreenSection from '@/components/base/section/fullScreenSection'
import FullHeightMainContainer from '@/components/common/fullHeightMainContainer'
import ServerError from '@/components/ui/error/serverError'

export default function Page() {
  return (
    <FullHeightMainContainer>
      <FullScreenSection>
        <ServerError />
      </FullScreenSection>
    </FullHeightMainContainer>
  )
}
