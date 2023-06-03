import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import FrontMatter from '@/app/blog/_components/frontMatter'
import NotFoundMeta from '@/components/meta/notFound'
import Section from '@/components/section'
import {
  compileMDX,
  getAllMDXSlugs,
  getMDXExistence,
  getMDXFrontMatter,
} from '@/lib/mdx'

type PageProps = {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const mdxPath = slug.join('/')
  const mdx = getMDXExistence(mdxPath)
  if (!mdx.exists) {
    return NotFoundMeta
  }
  const mdxMetaData = getMDXFrontMatter(mdxPath, mdx.extension)

  // FIXME: Dynamic OG images are not working
  // https://github.com/vercel/next.js/issues/49630
  // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#props

  return {
    title: mdxMetaData.title,
    description: mdxMetaData.description,
    openGraph: {
      url: `/blog/post/${mdxPath}`,
      images: [
        {
          alt: mdxMetaData.title,
          height: 630,
          width: 1200,
          url: `/opengraph/blog/post/${mdxPath}`,
        },
      ],
    },
    twitter: {
      title: mdxMetaData.title,
      description: mdxMetaData.description,
      card: 'summary_large_image',
      images: [
        {
          alt: mdxMetaData.title,
          height: 630,
          width: 1200,
          url: `/opengraph/blog/post/${mdxPath}`,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllMDXSlugs({})
  return slugs?.map((slug) => ({ slug: slug.split('/') }))
}

export default async function Page({ params: { slug } }: PageProps) {
  const mdxPath = slug.join('/')
  const mdx = getMDXExistence(mdxPath)
  if (!mdx.exists) {
    notFound()
  }

  const { content, frontMatter } = await compileMDX(mdxPath, mdx.extension)
  return (
    <>
      {frontMatter && (
        <Section>
          <FrontMatter {...frontMatter} />
        </Section>
      )}
      <Section>{content}</Section>
    </>
  )
}
