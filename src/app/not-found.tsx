import FullScreenSection from '@/components/base/section/fullScreenSection'
import FullHeightMainContainer from '@/components/common/fullHeightMainContainer'
import NotFound from '@/components/ui/error/notFound'

export default function Page() {
  return (
    <FullHeightMainContainer>
      <FullScreenSection>
        <NotFound />
      </FullScreenSection>
    </FullHeightMainContainer>
  )
}
