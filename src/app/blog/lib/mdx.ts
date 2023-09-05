import { z } from 'zod'

import { getAllMDX, getFrontMatterAttribute, getMDX, type MDX } from '@/lib/mdx'
import { isProduction } from '@/utils/env'

export const blogFrontMatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  tags: z.array(z.string()).optional(),
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
  { publicOnly = isProduction }: { publicOnly?: boolean } = {},
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
  publicOnly = isProduction,
}: GetAllBlogMDXOptions = {}) => {
  let returnMDX: MDX<BlogFrontMatter>[] = getAllMDX({
    mdx: { sourceDirectory: 'posts' },
    schema: blogFrontMatterSchema,
  })
  if (publicOnly) {
    returnMDX = returnMDX.filter((mdx) => mdx.frontMatter.status === 'public')
  }

  if (offset) {
    returnMDX = returnMDX.slice(offset)
  }
  if (limit) {
    returnMDX = returnMDX.slice(0, limit)
  }
  return returnMDX
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
