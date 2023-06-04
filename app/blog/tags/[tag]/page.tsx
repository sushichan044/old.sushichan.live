import PostGrid from '@/app/blog/_components/postGrid'
import Section from '@/components/section'
import { getAllMDXSlugs, getMDXExistence, getMDXFrontMatter } from '@/lib/mdx'

type PageProps = {
  params: {
    tag: string
  }
}

export default async function Page({ params: { tag } }: PageProps) {
  const decodedTag = decodeURIComponent(tag)

  const allPosts = (await getAllMDXSlugs({}))
    .map((slug) => getMDXExistence(slug))
    .flatMap((mdx) => (mdx.exists ? mdx : []))

  const rawFrontMatters = await Promise.all(
    allPosts.map((mdx) => getMDXFrontMatter(mdx.fileName, mdx.extension))
  )
  const matchedFrontMatters = rawFrontMatters
    .filter((metaData) => {
      return metaData.tags?.includes(decodedTag)
    })
    .sort((a, b) => {
      return a.date < b.date ? 1 : -1
    })

  return (
    <Section>
      <h1>{`「${decodedTag}」 のタグがついた記事`}</h1>
      <PostGrid posts={matchedFrontMatters} />
    </Section>
  )
}
