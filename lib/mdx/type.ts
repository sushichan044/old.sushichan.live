export type MDXFile = {
  topDirectory: string
  fileName: string
  extension: 'mdx' | 'md'
}

export type PartialMDXFile = Omit<MDXFile, 'extension'> & {
  extension?: 'mdx' | 'md'
}

export type FrontMatter = {
  title: string
  description: string
  date: Date
  updated: Date
  thumbnail: string
  tags?: string[]
  status: 'private' | 'public'
}

export type MDXMetaData = FrontMatter & {
  file: MDXFile
}

type MDXCompilerFeature = {
  generateToc?: boolean
}

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
