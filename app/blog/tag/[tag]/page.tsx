import PostGrid from '@/app/blog/components/postGrid'
import Section from '@/components/section'
import { getAllMDX, getAllTagsFromMDX, getMDXMetaData } from '@/lib/mdx'

type PageProps = {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const allPosts = await getAllMDX({ topDirectory: 'posts' })
  const allTags = await getAllTagsFromMDX(allPosts)
  return allTags.map((tag) => ({ tag }))
}

export default async function Page({ params: { tag } }: PageProps) {
  const decodedTag = decodeURIComponent(tag)
  const allPosts = await getAllMDX({ topDirectory: 'posts' })
  const metaDataList = await Promise.all(
    allPosts.map((mdx) => getMDXMetaData(mdx))
  )
  const matchedMetaDataList = metaDataList
    .filter(({ status }) => {
      return status === 'private'
    })
    .filter(({ tags }) => {
      return tags?.includes(decodedTag)
    })
    .sort((a, b) => {
      return a.date < b.date ? 1 : -1
    })

  return (
    <Section>
      <h1>{`「${decodedTag}」 のタグがついた記事`}</h1>
      <PostGrid posts={matchedMetaDataList} />
    </Section>
  )
}
