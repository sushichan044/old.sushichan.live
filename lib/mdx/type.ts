import { z } from 'zod'

export type MDXFileMetaData = {
  sourceDirectory: string
  fileName: string
  extension: 'mdx' | 'md'
}

export type PartialMDXFileMetaData = Omit<MDXFileMetaData, 'extension'> & {
  extension?: 'mdx' | 'md' | undefined
}

export type MDXSourceDirectory = {
  sourceDirectory: string
}

// TODO: migrate MDX handler to merge received schema with MDXFrontMatterBaseSchema
export const MDXFrontMatterBaseSchema = z.object({
  status: z.union([z.literal('public'), z.literal('private')]),
  created: z.date(),
  updated: z.date(),
})
export type MDXFrontMatterBase = z.infer<typeof MDXFrontMatterBaseSchema>

export type MDX<T extends object> = {
  fileMetaData: MDXFileMetaData
  frontMatter: T & MDXFrontMatterBase
}

type MDXCompilerFeature = {
  generateToc?: boolean
}

export type MDXCompilerOption =
  | (
      | {
          isRaw: false
          mdxFile: MDXFileMetaData
        }
      | {
          isRaw: true
          rawContent: string
        }
    ) & {
      feature?: MDXCompilerFeature
    }
