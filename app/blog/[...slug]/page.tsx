import { notFound } from 'next/navigation'

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
  const { content, frontMatter } = await compileMDX(mdxPath, mdx.extension)
  return (
    <>
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
    </>
  )
}
