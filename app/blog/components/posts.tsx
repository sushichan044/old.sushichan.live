'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import PostGrid from '@/app/blog/components/postGrid'
import type { BlogFrontMatter } from '@/app/blog/lib/mdx'
import type { MDX } from '@/lib/mdx'

// TODO: 部分的な取得ができるようにする
const Posts = ({ mdx }: { mdx: MDX<BlogFrontMatter>[] }) => {
  const params = useSearchParams()

  const selectedTags = useMemo(() => {
    return (params.get('tags')?.split(',') ?? []).filter(Boolean)
  }, [params])
  const filteredMDX = useMemo(() => {
    return mdx.filter((m) => {
      if (selectedTags.length === 0) {
        return true
      }
      return selectedTags.some((selectedTag) => {
        return m.frontMatter.tags?.includes(selectedTag)
      })
    })
  }, [mdx, selectedTags])

  // sort by created, new -> old
  const sortedMDX = filteredMDX.sort((a, b) => {
    return a.frontMatter.created < b.frontMatter.created ? 1 : -1
  })
  return <PostGrid posts={sortedMDX} />
}

export default Posts
