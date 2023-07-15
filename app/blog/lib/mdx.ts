import { z } from 'zod'

import {
  getAllMDX,
  getFrontMatterAttribute,
  getMDX,
  type MDX,
} from '@/lib/mdx/next'

export const blogFrontMatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  created: z.date(),
  updated: z.date(),
  tags: z.array(z.string()).optional(),
  status: z.union([z.literal('private'), z.literal('public')]),
})

export type BlogFrontMatter = z.infer<typeof blogFrontMatterSchema>

type GetAllBlogMDXOptions = {
  limit?: number
  offset?: number
  publicOnly?: boolean
  filter?: (mdx: MDX<BlogFrontMatter>) => boolean
}

export const getBlogMDX = (
  fileName: string,
  { publicOnly = true }: { publicOnly?: boolean } = {}
) => {
  const mdx = getMDX({
    mdx: {
      sourceDirectory: 'posts',
      fileName,
    },
    schema: blogFrontMatterSchema,
  })
  if (!mdx) return undefined
  if (publicOnly && mdx.frontMatter.status !== 'public') return undefined
  return mdx
}

export const getAllBlogMDX = ({
  limit,
  offset,
  publicOnly = true,
}: GetAllBlogMDXOptions = {}) => {
  let ReturnMDX: MDX<BlogFrontMatter>[] = []
  const allMDX = getAllMDX({
    mdx: { sourceDirectory: 'posts' },
    schema: blogFrontMatterSchema,
  })
  if (publicOnly) {
    ReturnMDX = allMDX.filter((mdx) => mdx.frontMatter.status === 'public')
  }

  if (offset) {
    ReturnMDX = ReturnMDX.slice(offset)
  }
  if (limit) {
    ReturnMDX = ReturnMDX.slice(0, limit)
  }
  return ReturnMDX
}

export const getAllBlogTags = (mdx: MDX<BlogFrontMatter>[]) => {
  const tags = getFrontMatterAttribute({
    mdx: mdx,
    attribute: 'tags',
  }).flat()
  const uniqueTags = [...new Set(tags)].flatMap((tag) => {
    if (!tag) return []
    return [tag]
  })
  return uniqueTags
}
