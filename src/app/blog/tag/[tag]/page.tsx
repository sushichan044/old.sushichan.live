import { Metadata } from 'next'

import PostGrid from '@/app/blog/components/postGrid'
import { getAllBlogMDX, getAllBlogTags } from '@/app/blog/lib/mdx'
import Section from '@/components/base/section'

type PageProps = {
  params: {
    tag: string
  }
}

export async function generateMetadata({
  params: { tag },
}: PageProps): Promise<Metadata> {
  const decodedTag = decodeURIComponent(tag)
  return {
    title: `#${decodedTag}`,
    description: `「${decodedTag}」 のタグがついた記事`,
  }
}

export async function generateStaticParams() {
  const allMDX = getAllBlogMDX()
  const tags = getAllBlogTags(allMDX)
  return tags.map((tag) => {
    return { tag }
  })
}

export default async function Page({ params: { tag } }: PageProps) {
  const decodedTag = decodeURIComponent(tag)
  const allMDX = getAllBlogMDX()
  const compatibleMDX = allMDX.filter(({ frontMatter }) => {
    return frontMatter.tags?.includes(decodedTag)
  })
  const sortedMDX = compatibleMDX.sort((a, b) => {
    return a.frontMatter.created < b.frontMatter.created ? 1 : -1
  })

  return (
    <Section>
      <h1>{`「${decodedTag}」 のタグがついた記事`}</h1>
      <PostGrid posts={sortedMDX} />
    </Section>
  )
}
