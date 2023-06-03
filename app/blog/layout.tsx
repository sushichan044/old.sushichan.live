import { Metadata } from 'next'

import MainContainer from '@/components/common/mainContainer'

export const metadata: Metadata = {
  title: {
    absolute: 'すしの雑記',
    template: '%s - すしの雑記',
  },
}

export default async function BlogLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <MainContainer>
      {children}
      {modal}
    </MainContainer>
  )
}
