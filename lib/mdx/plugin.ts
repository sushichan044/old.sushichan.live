import rehypeAutoLinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'
import stringWidth from 'string-width'
import { type PluggableList } from 'unified'

import rehypeImageOpt from '@/lib/mdx/rehype-image'
import { RehypeOptions, RemarkOptions } from '@/lib/mdx/type'

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
  rehypeAutoLinkHeadings,
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

const defaultRemarkOptions: RemarkOptions = {
  remarkToc: {
    use: false,
  },
}

const defaultRehypeOptions: RehypeOptions = {}

export const getRemarkPlugins = ({
  remarkToc: remarkTocOption,
}: RemarkOptions = defaultRemarkOptions) => {
  const remarkPlugins: PluggableList = [...remarkDefaultPlugins]
  if (remarkTocOption?.use) {
    remarkPlugins.push([remarkToc, remarkTocOption.options])
  }
  return remarkPlugins
}

export const getRehypePlugins = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: RehypeOptions = defaultRehypeOptions
) => {
  const rehypePlugins: PluggableList = [...rehypeDefaultPlugins]
  return rehypePlugins
}
