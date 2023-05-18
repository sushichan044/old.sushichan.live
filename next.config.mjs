import * as path from 'path'
import { fileURLToPath } from 'url'
import withMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // FIXME
  // disabled for now because plugins are not working
  // experimental: {
  //   mdxRs: true,
  // },
}

const nextMDX = withMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default nextMDX(nextConfig)
