import { notFound } from 'next/navigation'

import Section from '@/components/section'
import { compileMDX, getMDXFromPath } from '@/lib/mdx'

export const metadata = {
  title: 'about',
  description: 'Introduce myself',
}

export default async function Page() {
  const mdx = getMDXFromPath({ topDirectory: 'md', fileName: 'works' })
  if (!mdx) {
    notFound()
  }

  const content = await compileMDX({
    isRaw: false,
    mdxFile: mdx,
    feature: {
      generateToc: false,
    },
  })
  return <Section>{content}</Section>
}
