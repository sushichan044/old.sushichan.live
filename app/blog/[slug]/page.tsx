import { MDXComponents } from 'mdx/types'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import { checkMDXExists, getAllMDXSlugs, getMDXMeta } from '@/lib/mdx'

type PageProps = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getAllMDXSlugs()
  return slugs.map((slug) => ({ params: { slug } }))
}

export default async function Page({ params: { slug } }: PageProps) {
  if (!checkMDXExists(slug)) {
    notFound()
  }

  const MDXContent = dynamic<MDXComponents>(
    () => import(`../../../posts/${slug}.mdx`)
  )
  const meta = await getMDXMeta(slug)
  return (
    <>
      {meta && (
        <p>
          {Object.entries(meta)
            .map(([key, value]) => `${key}: ${value}`)
            .reduce<React.ReactNode>(
              (prev, curr) => [prev, <br key={null} />, curr],
              []
            )}
        </p>
      )}
      <MDXContent />
    </>
  )
}