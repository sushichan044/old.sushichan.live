import rehypePrism from '@mapbox/rehype-prism'
import fs from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

type mdxMetaData = {
  title: string
  description: string
  date: string
}

const postsDir = `${process.cwd()}/posts`

export const checkMDXExists = (fileName: string) => {
  return fs.existsSync(`${postsDir}/${fileName}.mdx`)
}

export const getAllMDXSlugs = async () => {
  return (await fs.promises.readdir(postsDir))
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.split('.')[0])
}

export const compileMDXFile = async (fileName: string) => {
  const mdx = await fs.promises.readFile(`${postsDir}/${fileName}.mdx`, 'utf8')

  const { content, frontmatter } = await compileMDX<mdxMetaData>({
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
