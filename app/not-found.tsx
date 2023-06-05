import FullHeightMainContainer from '@/components/common/fullHeightMainContainer'
import NotFound from '@/components/error/notFound'
import FullScreenSection from '@/components/section/fullScreenSection'

export default function Page() {
  return (
    <FullHeightMainContainer>
      <FullScreenSection>
        <NotFound />
      </FullScreenSection>
    </FullHeightMainContainer>
  )
}
