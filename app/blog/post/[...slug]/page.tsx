import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import FrontMatter from '@/components/blog/frontMatter'
import Section from '@/components/blog/section'
import NotFoundMeta from '@/components/meta/notFound'
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

  return {
    title: mdxMetaData.title,
    description: mdxMetaData.description,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllMDXSlugs()
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
