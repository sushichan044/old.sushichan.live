import { notFound } from 'next/navigation'

import { checkMDXExistence, compileMDX, getAllMDXSlugs } from '@/lib/mdx'

type PageProps = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getAllMDXSlugs()
  return slugs?.map((slug) => ({ slug: slug }))
}

export default async function Page({ params: { slug } }: PageProps) {
  const mdx = checkMDXExistence(slug)
  if (!mdx.exists) {
    notFound()
  }

  const { content, frontmatter } = await compileMDX(slug, mdx.extension)
  return (
    <>
      {frontmatter && (
        <p>
          {Object.entries(frontmatter)
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
