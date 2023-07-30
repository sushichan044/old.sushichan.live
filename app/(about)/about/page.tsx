import { notFound } from 'next/navigation'
import { z } from 'zod'

import Section from '@/components/section'
import Tabs from '@/components/tabs'
import { compileMDX, getMDX } from '@/lib/mdx'

export const metadata = {
  title: 'about',
  description: 'Introduce myself',
}

export default async function Page() {
  const commonAbout = getMDX({
    mdx: {
      sourceDirectory: 'md',
      fileName: 'about',
    },
    schema: z.object({}),
  })
  const devAbout = getMDX({
    mdx: {
      sourceDirectory: 'md',
      fileName: 'about-dev',
    },
    schema: z.object({}),
  })
  const otakuAbout = getMDX({
    mdx: {
      sourceDirectory: 'md',
      fileName: 'about-otaku',
    },
    schema: z.object({}),
  })
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
