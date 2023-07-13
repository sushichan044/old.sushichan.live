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

// types below will used in v2
// experimental type
type MDXFileMetaData = MDXFile
type MDXFrontMatterBase = {
  status: 'public' | 'private'
  created: Date
  updated: Date
}

// error if any key in T is in MDXFrontMatterBase
// will integrate with zod in v2
type MDXFrontMatter<T extends object> = keyof T extends keyof MDXFrontMatterBase
  ? never
  : MDXFrontMatterBase & T

// FUTURE: use this type as MDX general type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type MDX<T extends object> = {
  file: MDXFileMetaData
  metaData: MDXFrontMatter<T>
}
