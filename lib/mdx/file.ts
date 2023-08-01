import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { convertToJST } from '@/utils/date'
import { getFilePathRecursive, getFileTimestampsSync } from '@/utils/fs'

// eslint-disable-next-line no-restricted-imports
import type {
  AnyZodObjectOmitting,
  MDX,
  MDXFileMetaData,
  MDXSourceDirectory,
  MergedZodObjectInfer,
  PartialMDXFileMetaData,
  WithZodSchema,
} from './types'
// eslint-disable-next-line no-restricted-imports
import { MDXFrontMatterBaseSchema } from './utils/zod'

const getHomeDir = () => process.cwd()
const getMDXFilePath = ({
  sourceDirectory,
  fileName,
  extension,
}: MDXFileMetaData) =>
  path.join(getHomeDir(), sourceDirectory, `${fileName}.${extension}`)

export const getMDX = <
  Schema extends AnyZodObjectOmitting<typeof MDXFrontMatterBaseSchema>,
>({
  mdx,
  schema,
}: WithZodSchema<'mdx', PartialMDXFileMetaData, Schema>):
  | MDX<MergedZodObjectInfer<typeof schema, typeof MDXFrontMatterBaseSchema>>
  | undefined => {
  const fullSchema = schema.merge(MDXFrontMatterBaseSchema)
  const fileMetaData = getMDXFileMetaData(mdx)
  if (!fileMetaData) return undefined

  const rawFrontMatter = getFrontMatter({ fileMetaData })
  const validFrontMatter = fullSchema.parse(rawFrontMatter)
  return {
    fileMetaData,
    frontMatter: validFrontMatter,
  }
}

export const getAllMDX = <
  Schema extends AnyZodObjectOmitting<typeof MDXFrontMatterBaseSchema>,
>({
  mdx: { sourceDirectory },
  schema,
}: WithZodSchema<'mdx', MDXSourceDirectory, Schema>): MDX<
  MergedZodObjectInfer<typeof schema, typeof MDXFrontMatterBaseSchema>
>[] => {
  const fullSchema = schema.merge(MDXFrontMatterBaseSchema)
  const allFileMetaData = getAllMDXFileMetaData({ sourceDirectory })
  return allFileMetaData.map((fileMetaData) => {
    const rawFrontMatter = getFrontMatter({ fileMetaData })
    const validFrontMatter = fullSchema.parse(rawFrontMatter)
    return {
      fileMetaData,
      frontMatter: validFrontMatter,
    }
  })
}

export const getMDXFileMetaData = ({
  sourceDirectory,
  fileName,
  extension,
}: PartialMDXFileMetaData): MDXFileMetaData | undefined => {
  const extensions = extension
    ? ([extension] as const)
    : (['mdx', 'md'] as const)

  for (const extension of extensions) {
    if (
      fs.existsSync(getMDXFilePath({ sourceDirectory, fileName, extension }))
    ) {
      return { sourceDirectory, fileName, extension }
    }
  }
  return undefined
}

export const getAllMDXFileMetaData = ({
  sourceDirectory,
}: MDXSourceDirectory): MDXFileMetaData[] => {
  const absDir = path.posix.join(getHomeDir(), sourceDirectory)
  const allMDXPaths = getFilePathRecursive({ dir: absDir }).map((file) => {
    return path.posix.relative(sourceDirectory, file)
  })
  const files: MDXFileMetaData[] = allMDXPaths.flatMap((file) => {
    const [fileName, ...extFragment] = file.split('.').filter(Boolean)
    const extension = extFragment.join('.')

    if (extension !== 'md' && extension !== 'mdx') {
      return []
    }
    return [{ sourceDirectory, fileName, extension }]
  })
  return files
}

const getFrontMatter = ({
  fileMetaData,
}: {
  fileMetaData: MDXFileMetaData
}) => {
  const mdxPath = getMDXFilePath(fileMetaData)
  const { data } = matter.read(mdxPath)
  const timestamp = getFileTimestamps(fileMetaData)
  const rawCreated: Date = data.created ?? timestamp.created
  const rawModified: Date = data.modified ?? timestamp.modified

  const { created, modified } = convertToJST({
    created: rawCreated,
    modified: rawModified,
  })

  data.status = data.status ?? 'public'
  data.created = created
  data.updated = modified
  return data
}

const getFileTimestamps = (mdx: MDXFileMetaData) => {
  const mdxPath = getMDXFilePath(mdx)
  const timestamps = getFileTimestampsSync(mdxPath)
  return timestamps
}

export const readMDXFile = async (mdx: MDXFileMetaData) => {
  return fs.readFileSync(getMDXFilePath(mdx), 'utf8')
}

export const getFrontMatterAttribute = <T extends object, K extends keyof T>({
  mdx,
  attribute,
  unique = true,
}: {
  mdx: MDX<T>[]
  attribute: K
  unique?: boolean
}): T[K][] => {
  const attributes = mdx.map((mdx) => mdx.frontMatter[attribute])
  if (unique) {
    return [...new Set(attributes)]
  }
  return attributes
}
