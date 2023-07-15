import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { z, type ZodTypeAny } from 'zod'

import { getFilePathRecursive, getFileTimestampsSync } from '@/lib/fs'
import {
  type MDX,
  type MDXFileMetaData,
  type PartialMDXFileMetaData,
} from '@/lib/mdx/next/type'

const getHomeDir = () => process.cwd()
const getMDXFilePath = ({
  sourceDirectory,
  fileName,
  extension,
}: MDXFileMetaData) =>
  path.join(getHomeDir(), sourceDirectory, `${fileName}.${extension}`)

export const getMDX = <T extends ZodTypeAny>({
  mdx,
  schema,
}: {
  mdx: PartialMDXFileMetaData
  schema: T
}): MDX<z.infer<typeof schema>> | undefined => {
  const fileMetaData = getMDXFileMetaData(mdx)
  if (!fileMetaData) return undefined

  const rawFrontMatter = getFrontMatter({ fileMetaData })
  const validFrontMatter = schema.parse(rawFrontMatter) as z.infer<
    typeof schema
  >
  return {
    fileMetaData,
    frontMatter: validFrontMatter,
  }
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
}: {
  sourceDirectory: string
}): MDXFileMetaData[] => {
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
  const { created, modified } = getFileTimestamps(fileMetaData)
  data.status = data.status ?? 'public'
  data.created = data.created ?? created
  data.updated = data.updated ?? modified
  return data
}

const getFileTimestamps = (mdx: MDXFileMetaData) => {
  const mdxPath = getMDXFilePath(mdx)
  return getFileTimestampsSync(mdxPath)
}

export const readMDXFile = async (mdx: MDXFileMetaData) => {
  return fs.readFileSync(getMDXFilePath(mdx), 'utf8')
}