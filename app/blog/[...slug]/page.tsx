import { notFound } from 'next/navigation'
import React from 'react'

import MDXImage from '@/components/mdx/image'
import { checkMDXExistence, compileMDX, getAllMDXSlugs } from '@/lib/mdx'
type PageProps = {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  const slugs = await getAllMDXSlugs()
  return slugs?.map((slug) => ({ slug: slug.split('/') }))
}

export default async function Page({ params: { slug } }: PageProps) {
  const mdxPath = slug.join('/')
  const mdx = checkMDXExistence(mdxPath)
  if (!mdx.exists) {
    notFound()
  }

  // list of Custom Components used in mdx
  const customComponents = {
    // FIXME: 型パズルに敗北...
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img: (props: any) => <MDXImage {...props} />,
  }

  const { content, frontMatter } = await compileMDX(
    mdxPath,
    mdx.extension,
    customComponents
  )
  return (
    <div id="main-container">
      {frontMatter && (
        <p>
          {Object.entries(frontMatter)
            .map(([key, value]) => `${key}: ${value}`)
            .reduce<React.ReactNode>(
              (prev, curr) => [prev, <br key={null} />, curr],
              []
            )}
        </p>
      )}
      {content}
    </div>
  )
}
