import fs from 'fs'
import matter from 'gray-matter'
import { compileMDX as compileMDXFile } from 'next-mdx-remote/rsc'
// import rehypeAutoLinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeToc from 'rehype-toc'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkUnwrapImages from 'remark-unwrap-images'
import stringWidth from 'string-width'
import { type PluggableList } from 'unified'

import { MDXComponents } from '@/components/mdx'
import {
  findFilesRecursive,
  getFileModifiedTime,
  getFileModifiedTimeSync,
} from '@/lib/fs'
import rehypeImageOpt from '@/lib/rehype-image'

export type MDXFile = {
  topDirectory: string
  fileName: string
  extension: 'mdx' | 'md'
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

type MDXCompilerOption =
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

// path to directory
const getHomeDir = () => process.cwd()

const remarkDefaultPlugins: PluggableList = [
  [
    remarkGfm,
    {
      stringLength: stringWidth,
    },
  ],
  remarkEmoji,
  remarkMath,
  remarkUnwrapImages,
]

const rehypeDefaultPlugins: PluggableList = [
  rehypeSlug,
  // rehypeAutoLinkHeadings,
  rehypeKatex,
  rehypeImageOpt,
  [
    rehypePrettyCode,
    {
      theme: 'one-dark-pro',
      keepBackground: true,
    },
  ],
]

// compile MDX file to React Component
export const compileMDX = async ({
  feature: { generateToc = false } = {},
  ...params
}: MDXCompilerOption) => {
  const mdxContent = params.isRaw
    ? params.rawContent
    : await getMDXContent(params.mdxFile)

  const { content } = await compileMDXFile<FrontMatter>({
    components: MDXComponents,
    source: mdxContent,
    options: {
      mdxOptions: {
        remarkPlugins: remarkDefaultPlugins,
        rehypePlugins: (() => {
          const plugins = [...rehypeDefaultPlugins]
          if (generateToc) {
            plugins.push([
              rehypeToc,
              {
                headings: ['h2'],
              },
            ])
          }
          return plugins
        })(),
      },
      // if this set to false,
      // frontMatter will appear as content
      parseFrontmatter: true,
    },
  })
  return content
}

export const getMDXFromPath = ({
  topDirectory,
  fileName,
  extension,
}: {
  topDirectory: string
  fileName: string
  extension?: 'mdx' | 'md'
}): MDXFile | undefined => {
  if (extension) {
    if (
      !fs.existsSync(`${getHomeDir()}/${topDirectory}/${fileName}.${extension}`)
    ) {
      return undefined
    }
    return { topDirectory, fileName, extension }
  }

  if (fs.existsSync(`${getHomeDir()}/${topDirectory}/${fileName}.mdx`)) {
    return { topDirectory, fileName, extension: 'mdx' }
  }

  if (fs.existsSync(`${getHomeDir()}/${topDirectory}/${fileName}.md`)) {
    return { topDirectory, fileName, extension: 'md' }
  }
  return undefined
}

export const getAllMDX = async ({
  topDirectory,
  ignorePattern = /^_/,
  maxCount,
}: {
  topDirectory: string
  ignorePattern?: RegExp
  maxCount?: number
}): Promise<MDXFile[]> => {
  const allPosts = await findFilesRecursive(
    `${getHomeDir()}/${topDirectory}`,
    ignorePattern,
    maxCount
  )

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

export const getMDXContent = async ({
  topDirectory,
  fileName,
  extension,
}: MDXFile): Promise<string> => {
  const mdxPath = `${getHomeDir()}/${topDirectory}/${fileName}.${extension}`
  return await fs.promises.readFile(mdxPath, 'utf8')
}

export const getMDXMetaData = async ({
  topDirectory,
  fileName,
  extension,
}: MDXFile): Promise<MDXMetaData> => {
  const mdxPath = `${getHomeDir()}/${topDirectory}/${fileName}.${extension}`

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
    file: {
      topDirectory,
      fileName,
      extension,
    },
  }
}

export const getMDXMetaDataSync = ({
  topDirectory,
  fileName,
  extension,
}: MDXFile): MDXMetaData => {
  const mdxPath = `${getHomeDir()}/${topDirectory}/${fileName}.${extension}`

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
    file: {
      topDirectory,
      fileName,
      extension,
    },
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
