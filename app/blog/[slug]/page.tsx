import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import { checkMDXExists, getMDXMeta } from '@/lib/mdx'

type PageProps = {
  params: {
    slug: string
  }
}

export default async function Page({ params: { slug } }: PageProps) {
  if (!checkMDXExists(slug)) {
    notFound()
  }

  const MDXComponent = dynamic(() => import(`../../../posts/${slug}.mdx`))
  const meta = await getMDXMeta(slug)
  return (
    <>
      <p>
        {Object.entries(meta)
          .map(([key, value]) => `${key}: ${value}`)
          .reduce<React.ReactNode>(
            (prev, curr) => [prev, <br key={null} />, curr],
            []
          )}
      </p>
      <MDXComponent />
    </>
  )
}
