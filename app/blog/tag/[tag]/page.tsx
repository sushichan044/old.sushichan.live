import PostGrid from '@/app/blog/components/postGrid'
import Section from '@/components/section'
import { getAllMDXFile, getAllMDXMetaData, getAllTagsFromMDX } from '@/lib/mdx'

type PageProps = {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const allPostMetaData = getAllMDXMetaData(
    getAllMDXFile({ topDirectory: 'posts' })
  )
  const allTags = getAllTagsFromMDX(allPostMetaData)
  return allTags.map((tag) => ({ tag }))
}

export default async function Page({ params: { tag } }: PageProps) {
  const decodedTag = decodeURIComponent(tag)
  const allPosts = getAllMDXFile({ topDirectory: 'posts' })
  const metaDataList = getAllMDXMetaData(allPosts)

  const matchedMetaDataList = metaDataList
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
