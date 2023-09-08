import { notFound } from 'next/navigation'

import { getAboutMDX } from '@/app/(about)/about/mdx'
import Section from '@/components/base/section'
import Tabs from '@/components/ui/tabs'
import { compileMDX } from '@/lib/mdx'

export const metadata = {
  title: 'about',
  description: 'Introduce myself',
}

export default async function Page() {
  const { commonAbout, devAbout, otakuAbout } = getAboutMDX()
  if (!commonAbout || !devAbout || !otakuAbout) {
    notFound()
  }

  const commonAboutContent = await compileMDX({
    isRaw: false,
    mdxFile: commonAbout.fileMetaData,
  })
  const devContent = await compileMDX({
    isRaw: false,
    mdxFile: devAbout.fileMetaData,
  })
  const otakuContent = await compileMDX({
    isRaw: false,
    mdxFile: otakuAbout.fileMetaData,
  })

  return (
    <Section>
      {commonAboutContent}
      <Tabs
        items={[
          {
            label: {
              internal: 'dev',
              external: 'As Developer',
            },
            content: devContent,
            default: true,
          },
          {
            label: {
              internal: 'otaku',
              external: 'As オタク',
            },
            content: otakuContent,
          },
        ]}
      />
    </Section>
  )
}
