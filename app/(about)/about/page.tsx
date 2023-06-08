import NotFoundMeta from '@/components/meta/notFound'
import Section from '@/components/section'
import { compileMDX, getMDXExistence } from '@/lib/mdx'

export const metadata = {
  title: 'about',
  description: 'Introduce myself',
}

export default async function Page() {
  const mdx = getMDXExistence('md/about')
  if (!mdx.exists) {
    return NotFoundMeta
  }
  const { fileName, extension } = mdx
  const content = await compileMDX({
    isRaw: false,
    fileName: fileName,
    extension: extension,
    feature: {
      generateToc: false,
    },
  })

  return <Section>{content}</Section>
}
