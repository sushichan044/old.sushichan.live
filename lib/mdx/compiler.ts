import { compileMDX as compileMDXFile } from 'next-mdx-remote/rsc'

import { MDXComponents } from '@/components/mdx'
import { type MDXOption, readMDXFile } from '@/lib/mdx'
import { getRehypePlugins, getRemarkPlugins } from '@/lib/mdx/plugin'

export const compileMDX = async ({
  options: { format = 'mdx', pluginOptions = {} } = {},
  ...params
}: MDXOption) => {
  const mdxContent = params.isRaw
    ? params.rawContent
    : await readMDXFile(params.mdxFile)

  // TODO この文字列の段階で任意の何かでページを分割できるようにする
  const { content } = await compileMDXFile({
    components: MDXComponents,
    source: mdxContent,
    options: {
      mdxOptions: {
        format: format,
        remarkPlugins: getRemarkPlugins(pluginOptions.remark),
        rehypePlugins: getRehypePlugins(pluginOptions.rehype),
      },
      // if this set to false,
      // frontMatter will appear as content
      parseFrontmatter: true,
    },
  })
  return content
}
