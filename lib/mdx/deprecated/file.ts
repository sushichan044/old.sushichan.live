import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { getFileModifiedTimeSync, getFilePathRecursive } from '@/lib/fs'

/* eslint-disable no-restricted-imports */
import type { MDXFile, MDXMetaData, PartialMDXFile } from './type'

// path to directory
const getHomeDir = () => process.cwd()
const getMDXFilePath = ({ topDirectory, fileName, extension }: MDXFile) =>
  path.join(getHomeDir(), topDirectory, `${fileName}.${extension}`)

/**
 * @deprecated since version 2.0
 */
export const getMDXFromPath = ({
  topDirectory,
  fileName,
}: PartialMDXFile): MDXFile | undefined => {
  const extensions = ['mdx', 'md'] as const
  for (const extension of extensions) {
    const filePath = getMDXFilePath({ topDirectory, fileName, extension })
    if (fs.existsSync(filePath)) {
      return { topDirectory, fileName, extension }
    }
  }
  return undefined
}

/**
 * @deprecated since version 2.0
 */
export const getAllMDXFile = ({
  topDirectory,
}: // TODO support ignorePattern, maxCount
// ignorePattern = /^_/,
// maxCount,
{
  topDirectory: string
  // ignorePattern?: RegExp
  // maxCount?: number
}): MDXFile[] => {
  const absDir = path.posix.join(getHomeDir(), topDirectory)
  const allMDXPaths = getFilePathRecursive({ dir: absDir }).map((file) => {
    return path.posix.relative(topDirectory, file)
  })

  // flatMapでいい感じに型ガードする
  // https://qiita.com/xx2xyyy/items/9116d52d6dfd4f3549ef
  const MDXFiles: MDXFile[] = allMDXPaths.flatMap((file) => {
    const [fileName, ...extFragment] = file.split('.').filter(Boolean)
    const extension = extFragment.join('.')

    if (extension !== 'md' && extension !== 'mdx') {
      return []
    }

    return [{ topDirectory, fileName, extension }]
  })

  return MDXFiles
}

/**
 * @deprecated since version 2.0
 */
export const getMDXContent = async (mdx: MDXFile): Promise<string> => {
  const mdxPath = getMDXFilePath(mdx)
  return await fs.promises.readFile(mdxPath, 'utf8')
}

/**
 * @deprecated since version 2.0
 */
export const isPublicMDX = (mdxMetaData: MDXMetaData) => {
  if (process.env.NODE_ENV === 'production') {
    return mdxMetaData.status === 'public'
  }
  return true
}

/**
 * @deprecated since version 2.0
 */
export const getMDXData = (
  mdx: PartialMDXFile
): { mdxFile: MDXFile; metaData: MDXMetaData } | undefined => {
  const mdxFile = getMDXFromPath(mdx)
  if (!mdxFile) {
    return undefined
  }
  const metaData = getMDXMetaData(mdxFile)
  if (!isPublicMDX(metaData)) {
    return undefined
  }
  return { mdxFile, metaData }
}

/**
 * @deprecated since version 2.0
 */
export const getMDXMetaData = (mdx: MDXFile): MDXMetaData => {
  const mdxPath = getMDXFilePath(mdx)
  const { data } = matter.read(mdxPath)
  const mtime = getFileModifiedTimeSync(mdxPath)

  const meta: MDXMetaData = {
    date: data.date,
    description: data.description,
    file: mdx,
    status: data?.status ?? 'public',
    tags: data?.tags,
    thumbnail: data.thumbnail,
    title: data.title,
    updated: mtime,
  }

  return meta
}

/**
 * @deprecated since version 2.0
 */
export const getAllMDXMetaData = (
  mdxFiles: MDXFile[],
  { visibleOnly = true }: { visibleOnly?: boolean } = {}
) => {
  const allMeta = mdxFiles.flatMap((mdxFile) => {
    const mdxMetaData = getMDXMetaData(mdxFile)
    if (visibleOnly && !isPublicMDX(mdxMetaData)) {
      return []
    }
    return [mdxMetaData]
  })
  return allMeta
}

/**
 * @deprecated since version 2.0
 */
export const getAllTagsFromMDX = (mdxMetaData: MDXMetaData[]) => {
  const tags = new Set<string>()
  for (const metaData of mdxMetaData) {
    if (!isPublicMDX(metaData)) {
      continue
    }
    for (const tag of metaData.tags ?? []) {
      tags.add(tag)
    }
  }
  return Array.from(tags)
}
