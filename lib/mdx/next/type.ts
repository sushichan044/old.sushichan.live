import { z } from 'zod'

// {
//   sourceDirectory: string
//   fileName: string
//   extension: 'mdx' | 'md'
// }
const MDXFileMetaDataSchema = z.object({
  sourceDirectory: z.string(),
  fileName: z.string(),
  extension: z.union([z.literal('mdx'), z.literal('md')]),
})
export type MDXFileMetaData = z.infer<typeof MDXFileMetaDataSchema>

// {
//   sourceDirectory: string
//   fileName: string
//   extension?: 'mdx' | 'md' | undefined
// }
const PartialMDXFileMetaDataSchema = MDXFileMetaDataSchema.omit({
  extension: true,
}).extend({
  extension: z.union([z.literal('mdx'), z.literal('md')]).optional(),
})
export type PartialMDXFileMetaData = z.infer<
  typeof PartialMDXFileMetaDataSchema
>

// TODO: migrate MDX handler to merge received schema with MDXFrontMatterBaseSchema
export const MDXFrontMatterBaseSchema = z.object({
  status: z.union([z.literal('public'), z.literal('private')]),
  created: z.date(),
  updated: z.date(),
})
export type MDXFrontMatterBase = z.infer<typeof MDXFrontMatterBaseSchema>

export type MDX<T extends object> = {
  fileMetaData: MDXFileMetaData
  frontMatter: T
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
