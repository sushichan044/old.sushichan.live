import rehypeAutoLinkHeadings from 'rehype-autolink-headings'
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

// eslint-disable-next-line no-restricted-imports
import type { RehypeOptions, RemarkOptions } from './types'

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

const defaultRehypeOptions: RehypeOptions = {
  rehypeToc: {
    use: false,
  },
}

export const getRemarkPlugins = ({}: RemarkOptions = defaultRemarkOptions) => {
  const remarkPlugins: PluggableList = [...remarkDefaultPlugins]
  return remarkPlugins
}

export const getRehypePlugins = ({
  rehypeToc: rehypeTocOption,
}: RehypeOptions = defaultRehypeOptions) => {
  const rehypePlugins: PluggableList = [...rehypeDefaultPlugins]
  if (rehypeTocOption?.use) {
    rehypePlugins.push([rehypeToc, rehypeTocOption.options])
  }
  return rehypePlugins
}
