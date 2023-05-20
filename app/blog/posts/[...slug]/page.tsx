import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import styles from '@/app/blog/posts/[...slug]/page.module.scss'
import FrontMatter from '@/components/mdx/frontMatter'
import MDXImage from '@/components/mdx/image'
import {
  checkMDXExistence,
  compileMDX,
  getAllMDXSlugs,
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
  const mdx = checkMDXExistence(mdxPath)
  if (!mdx.exists) {
    return {
      title: '404 Not Found',
    }
  }
  const mdxMetaData = getMDXFrontMatter(mdxPath, mdx.extension)

  return {
    title: mdxMetaData.title,
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

  // list of Custom Components used in mdx
  const customComponents = {
    // FIXME: 型パズルに敗北...
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img: (props: any) => <MDXImage {...props} />,
  }

  const { content, frontMatter } = await compileMDX(
    mdxPath,
    mdx.extension,
    customComponents
  )
  return (
    <div id="main-container">
      <div className={styles['article-root']}>
        {frontMatter && <FrontMatter {...frontMatter} />}
        {content}
      </div>
    </div>
  )
}
