import rehypePrism from '@mapbox/rehype-prism'
import fs from 'fs'
import matter from 'gray-matter'
import {
  compileMDX as compileMDXFile,
  type MDXRemoteProps,
} from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

import { fileHasExtension, recursiveGetFilepath } from '@/lib/fs'

type mdxMetaData = {
  title: string
  description: string
  date: string
}

type MDXExistence =
  | {
      exists: true
      extension: 'mdx' | 'md'
    }
  | {
      exists: false
    }

// path to posts directory
const postsDir = `${process.cwd()}/posts`

// compile MDX file to React Component
export const compileMDX = async (
  fileName: string,
  extension: 'mdx' | 'md',
  components: MDXRemoteProps['components']
) => {
  const mdx = await fs.promises.readFile(
    `${postsDir}/${fileName}.${extension}`,
    'utf8'
  )

  const { content } = await compileMDXFile<mdxMetaData>({
    components: components,
    source: mdx,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
      },
      // if this set to false,
      // frontMatter will appear as content
      parseFrontmatter: true,
    },
  })
  const frontMatter = getMDXFrontMatter(fileName, extension)
  return { content, frontMatter }
}

export const checkMDXExistence = (fileName: string): MDXExistence => {
  if (fs.existsSync(`${postsDir}/${fileName}.mdx`)) {
    return {
      exists: true,
      extension: 'mdx',
    }
  }

  if (fs.existsSync(`${postsDir}/${fileName}.md`)) {
    return {
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
) => {
  const { data } = matter.read(`${postsDir}/${fileName}.${extension}`)
  return data as mdxMetaData
}

export const getAllMDXSlugs = async () => {
  return (await recursiveGetFilepath(postsDir))
    .filter((file) => fileHasExtension(file, ['md', 'mdx']))
    .map((file) => file.replace(/.mdx?$/, ''))
}
