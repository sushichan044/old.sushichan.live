import { notFound } from 'next/navigation'

import { checkMDXExists, compileMDXFile, getAllMDXSlugs } from '@/lib/mdx'

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
  if (!checkMDXExists(slug)) {
    notFound()
  }

  const { content, frontmatter } = await compileMDXFile(slug)
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
