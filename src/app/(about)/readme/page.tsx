import Link from '@/components/base/link'
import Section from '@/components/base/section'
import { compileMDX } from '@/lib/mdx'
import { removeHtmlComments } from '@/utils/html'

export const metadata = {
  title: 'about',
  description: 'Introduce myself',
}

const README_URL =
  'https://raw.githubusercontent.com/sushi-chaaaan/sushi-chaaaan/main/README.md'

export default async function Page() {
  // fetch readme from raw github
  const readme = await fetch(README_URL).then((res) => res.text())

  const readmeContent = await compileMDX({
    isRaw: true,
    rawContent: removeHtmlComments(readme),
  })

  return (
    <>
      <h1>
        <Link href={README_URL}>README.md</Link>
      </h1>
      <Section>{readmeContent}</Section>
    </>
  )
}
