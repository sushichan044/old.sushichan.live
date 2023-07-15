/**
 * @deprecated since version 2.0
 */
export type MDXFile = {
  topDirectory: string
  fileName: string
  extension: 'mdx' | 'md'
}

/**
 * @deprecated since version 2.0
 */
export type PartialMDXFile = Omit<MDXFile, 'extension'> & {
  extension?: 'mdx' | 'md'
}

/**
 * @deprecated since version 2.0
 */
export type FrontMatter = {
  title: string
  description: string
  date: Date
  updated: Date
  thumbnail: string
  tags?: string[]
  status: 'private' | 'public'
}

/**
 * @deprecated since version 2.0
 */
export type MDXMetaData = FrontMatter & {
  file: MDXFile
}

type MDXCompilerFeature = {
  generateToc?: boolean
}

/**
 * @deprecated since version 2.0
 */
export type MDXCompilerOption =
  | (
      | {
          isRaw: false
          mdxFile: MDXFile
        }
      | {
          isRaw: true
          rawContent: string
        }
    ) & {
      feature?: MDXCompilerFeature
    }
