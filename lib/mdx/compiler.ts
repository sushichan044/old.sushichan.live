import { compileMDX as compileMDXFile } from 'next-mdx-remote/rsc'

import { MDXComponents } from '@/components/mdx'

// eslint-disable-next-line no-restricted-imports
import { readMDXFile } from './file'
// eslint-disable-next-line no-restricted-imports
import { getRehypePlugins, getRemarkPlugins } from './plugin'
// eslint-disable-next-line no-restricted-imports
import { type MDXOption } from './types'

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
        remarkRehypeOptions: {
          footnoteLabel: '脚注',
          footnoteLabelProperties: { className: ['footnote-label'] },
          footnoteLabelTagName: 'p',
          footnoteBackLabel: '本文へ戻る',
        },
      },
      // if this set to false,
      // frontMatter will appear as content
      parseFrontmatter: true,
    },
  })
  return content
}
