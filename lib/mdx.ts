import fs from 'fs'
import matter from 'gray-matter'
import { compileMDX as compileMDXFile } from 'next-mdx-remote/rsc'
import rehypeAutoLinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkUnwrapImages from 'remark-unwrap-images'

import { customComponents } from '@/components/mdx/customComponents'
import { fileHasExtension, recursiveGetFilepath } from '@/lib/fs'
import rehypeImageOpt from '@/lib/rehype-image'

export type mdxMetaData = {
  title: string
  description: string
  date: Date
  thumbnail?: string
}

export type mdxMetaDataWithFile = mdxMetaData & {
  file: {
    fileName: string
    extension: 'mdx' | 'md'
  }
}

type MDXExistence =
  | {
      exists: true
      fileName: string
      extension: 'mdx' | 'md'
    }
  | {
      exists: false
    }

// path to posts directory
const postsDir = `${process.cwd()}/posts`

// compile MDX file to React Component
export const compileMDX = async (fileName: string, extension: 'mdx' | 'md') => {
  const mdx = await fs.promises.readFile(
    `${postsDir}/${fileName}.${extension}`,
    'utf8'
  )

  const { content } = await compileMDXFile<mdxMetaData>({
    components: customComponents,
    source: mdx,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkEmoji, remarkMath, remarkUnwrapImages],
        rehypePlugins: [
          rehypeSlug,
          rehypeAutoLinkHeadings,
          rehypeKatex,
          rehypeImageOpt,
          [
            rehypePrettyCode,
            {
              // theme: {
              //   dark: 'one-dark-pro',
              //   light: 'github-light',
              // },
              theme: 'one-dark-pro',
              keepBackground: true,
            },
          ],
        ],
      },
      // if this set to false,
      // frontMatter will appear as content
      parseFrontmatter: true,
    },
  })
  const frontMatter = getMDXFrontMatter(fileName, extension)
  return { content, frontMatter }
}

export const getMDXExistence = (fileName: string): MDXExistence => {
  if (fs.existsSync(`${postsDir}/${fileName}.mdx`)) {
    return {
      fileName: fileName,
      exists: true,
      extension: 'mdx',
    }
  }

  if (fs.existsSync(`${postsDir}/${fileName}.md`)) {
    return {
      fileName: fileName,
      exists: true,
      extension: 'md',
    }
  }
  return {
    exists: false,
  }
}

export const getMDXFrontMatter = (
  fileName: string,
  extension: 'mdx' | 'md'
): mdxMetaDataWithFile => {
  const { data } = matter.read(`${postsDir}/${fileName}.${extension}`)

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    thumbnail: data?.thumbnail,
    file: {
      fileName: fileName,
      extension: extension,
    },
  }

  // return data as mdxMetaData
}

export const getAllMDXSlugs = async ({
  ignorePrefix = /^_/,
  maxCount,
}: {
  ignorePrefix?: RegExp
  maxCount?: number
}) => {
  return (await recursiveGetFilepath(postsDir, ignorePrefix, maxCount))
    .filter((file) => fileHasExtension(file, ['md', 'mdx']))
    .map((file) => file.replace(/.mdx?$/, ''))
}
