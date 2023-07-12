import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { getFileModifiedTimeSync, getFilePathRecursive } from '@/lib/fs'
import type { MDXFile, MDXMetaData } from '@/lib/mdx/type'

// path to directory
const getHomeDir = () => process.cwd()
const getMDXFilePath = ({ topDirectory, fileName, extension }: MDXFile) =>
  path.join(getHomeDir(), topDirectory, `${fileName}.${extension}`)

export const getMDXFromPath = ({
  topDirectory,
  fileName,
  extension,
}: {
  topDirectory: string
  fileName: string
  extension?: 'mdx' | 'md'
}): MDXFile | undefined => {
  if (
    extension &&
    fs.existsSync(getMDXFilePath({ topDirectory, fileName, extension }))
  ) {
    return { topDirectory, fileName, extension }
  }

  if (
    fs.existsSync(getMDXFilePath({ topDirectory, fileName, extension: 'mdx' }))
  ) {
    return { topDirectory, fileName, extension: 'mdx' }
  }

  if (
    fs.existsSync(getMDXFilePath({ topDirectory, fileName, extension: 'md' }))
  ) {
    return { topDirectory, fileName, extension: 'md' }
  }
  return undefined
}

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

export const getMDXContent = async (mdx: MDXFile): Promise<string> => {
  const mdxPath = getMDXFilePath(mdx)
  return await fs.promises.readFile(mdxPath, 'utf8')
}

export const isVisibleMDX = (mdxMetaData: MDXMetaData) => {
  if (process.env.NODE_ENV === 'production') {
    return mdxMetaData.status === 'public'
  }
  return true
}

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

export const getAllMDXMetaData = (
  mdxFiles: MDXFile[],
  { visibleOnly = true }: { visibleOnly?: boolean } = {}
) => {
  const allMeta = mdxFiles.flatMap((mdxFile) => {
    const mdxMetaData = getMDXMetaData(mdxFile)
    if (visibleOnly && !isVisibleMDX(mdxMetaData)) {
      return []
    }
    return [mdxMetaData]
  })
  return allMeta
}

export const getAllTagsFromMDX = async (mdxFiles: MDXFile[]) => {
  const tags = new Set<string>()
  for (const mdxFile of mdxFiles) {
    const mdxMetaData = getMDXMetaData(mdxFile)
    if (!isVisibleMDX(mdxMetaData)) {
      continue
    }
    for (const tag of mdxMetaData.tags ?? []) {
      tags.add(tag)
    }
  }
  return Array.from(tags)
}
