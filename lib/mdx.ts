import rehypePrism from '@mapbox/rehype-prism'
import fs from 'fs'
import { compileMDX as compileMDXFile } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

import Section from '@/components/section'
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

// list of Custom Components used in mdx
const customComponents = { Section }

// compile MDX file to React Component
export const compileMDX = async (fileName: string, extension: 'mdx' | 'md') => {
  const mdx = await fs.promises.readFile(
    `${postsDir}/${fileName}.${extension}`,
    'utf8'
  )

  const { content, frontmatter } = await compileMDXFile<mdxMetaData>({
    components: customComponents,
    source: mdx,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
      },
      parseFrontmatter: true,
    },
  })
  return { content, frontmatter }
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

export const getAllMDXSlugs = async () => {
  return (await recursiveGetFilepath(postsDir))
    .filter((file) => fileHasExtension(file, ['md', 'mdx']))
    .map((file) => file.replace(/.mdx?$/, ''))
}
