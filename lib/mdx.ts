import rehypePrism from '@mapbox/rehype-prism'
import fs from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

import Section from '@/components/section'

type mdxMetaData = {
  title: string
  description: string
  date: string
}

const postsDir = `${process.cwd()}/posts`

// list of Custom Components used in mdx
const customComponents = { Section }

// compile MDX file to React Component
export const compileMDXFile = async (fileName: string) => {
  const mdx = await fs.promises.readFile(`${postsDir}/${fileName}.mdx`, 'utf8')

  const { content, frontmatter } = await compileMDX<mdxMetaData>({
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

export const checkMDXExists = (fileName: string) => {
  return fs.existsSync(`${postsDir}/${fileName}.mdx`)
}

export const getAllMDXSlugs = async () => {
  return (await fs.promises.readdir(postsDir))
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('/.mdx$/', ''))
}
