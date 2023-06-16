import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import {
  getFileModifiedTime,
  getFileModifiedTimeSync,
  getFilePathRecursive,
} from '@/lib/fs'
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

// TODO: this should not be marked as async
export const getAllMDX = async ({
  topDirectory,
}: // FIXME
// ignorePattern = /^_/,
// maxCount,
{
  topDirectory: string
  ignorePattern?: RegExp
  maxCount?: number
}): Promise<MDXFile[]> => {
  // const _allPosts = await findFilesRecursive(
  //   `${getHomeDir()}/${topDirectory}`,
  //   ignorePattern,
  //   maxCount
  // )
  const allPosts = getFilePathRecursive(
    path.join(getHomeDir(), topDirectory)
  ).map((path) => {
    const fragments = path.split('/')
    const pathWithoutTop = fragments.slice(1).join('/')
    return pathWithoutTop
  })

  // flatMapでいい感じに型ガードする
  // https://qiita.com/xx2xyyy/items/9116d52d6dfd4f3549ef
  const MDXFiles: MDXFile[] = allPosts.flatMap((file) => {
    const fragment = file.split('.')
    const fileName = fragment.slice(0, fragment.length - 1).join('.')
    const extension = fragment[fragment.length - 1]

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

export const getMDXMetaData = async (mdx: MDXFile): Promise<MDXMetaData> => {
  const mdxPath = getMDXFilePath(mdx)
  const { data } = matter.read(mdxPath)
  const mtime = await getFileModifiedTime(mdxPath)

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    updated: mtime,
    thumbnail: data.thumbnail,
    tags: data?.tags,
    status: data?.status ?? 'public',
    file: mdx,
  }
}

export const getMDXMetaDataSync = (mdx: MDXFile): MDXMetaData => {
  const mdxPath = getMDXFilePath(mdx)
  const { data } = matter.read(mdxPath)
  const mtime = getFileModifiedTimeSync(mdxPath)

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    updated: mtime,
    thumbnail: data.thumbnail,
    tags: data?.tags,
    status: data?.status ?? 'public',
    file: mdx,
  }
}

export const isVisibleMDX = (mdxMetaData: MDXMetaData) => {
  if (process.env.NODE_ENV === 'production') {
    return mdxMetaData.status === 'public'
  }
  return true
}

export const getAllMDXMetaData = async (mdxFiles: MDXFile[]) => {
  return (
    await Promise.all(mdxFiles.map((mdxFile) => getMDXMetaData(mdxFile)))
  ).filter((mdx) => isVisibleMDX(mdx))
}

export const getAllTagsFromMDX = async (mdxFiles: MDXFile[]) => {
  const tags = new Set<string>()
  for (const mdxFile of mdxFiles) {
    const mdxMetaData = await getMDXMetaData(mdxFile)
    for (const tag of mdxMetaData.tags ?? []) {
      tags.add(tag)
    }
  }
  return Array.from(tags)
}
