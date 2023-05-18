import { notFound } from 'next/navigation'
import { lazy, ReactNode } from 'react'

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

  const MDXComponent = lazy(() => import(`../../../posts/${slug}.mdx`))
  const meta = await getMDXMeta(slug)
  return (
    <>
      <p>
        {Object.entries(meta)
          .map(([key, value]) => `${key}: ${value}`)
          .reduce<ReactNode>(
            (prev, curr) => [prev, <br key={null} />, curr],
            []
          )}
      </p>
      <MDXComponent />
    </>
  )
}
