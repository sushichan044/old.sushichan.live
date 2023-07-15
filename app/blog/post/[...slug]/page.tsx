import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import FrontMatterCard from '@/app/blog/components/frontMatterCard'
import { blogFrontMatterSchema } from '@/app/blog/schema'
import Article from '@/components/article'
import NotFoundMeta from '@/components/meta/notFound'
import Section from '@/components/section'
import { compileMDX, getAllMDXFileMetaData, getMDX } from '@/lib/mdx/next'

type PageProps = {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const fileName = slug.join('/')
  const mdx = getMDX({
    mdx: { sourceDirectory: 'posts', fileName },
    schema: blogFrontMatterSchema,
  })

  if (!mdx) {
    return NotFoundMeta
  }
  const {
    fileMetaData: file,
    frontMatter: { title, description, thumbnail },
  } = mdx

  // TODO: Add fallback ogp image url like favicon

  // ↓ これは記事内のthumbnailUrlに直接アクセスさせて解決する
  // FIXME: Dynamic OG images are not working
  // https://github.com/vercel/next.js/issues/49630
  // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#props

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      url: `/blog/post/${file.fileName}`,
      images: [
        {
          alt: title,
          height: 630,
          width: 1200,
          url: thumbnail,
        },
      ],
    },
    twitter: {
      title: title,
      description: description,
      card: 'summary_large_image',
      images: [
        {
          alt: title,
          height: 630,
          width: 1200,
          url: thumbnail,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const slugs = getAllMDXFileMetaData({ sourceDirectory: 'posts' })
  return slugs?.map(({ fileName }) => ({ slug: fileName.split('/') }))
}

export default async function Page({ params: { slug } }: PageProps) {
  const fileName = slug.join('/')
  const mdx = getMDX({
    mdx: { sourceDirectory: 'posts', fileName },
    schema: blogFrontMatterSchema,
  })
  if (!mdx) {
    notFound()
  }

  const content = await compileMDX({
    isRaw: false,
    mdxFile: mdx.fileMetaData,
    feature: {
      generateToc: true,
    },
  })

  return (
    <>
      <Section>
        <FrontMatterCard date={mdx.frontMatter.created} {...mdx.frontMatter} />
      </Section>
      <Article>{content}</Article>
    </>
  )
}
