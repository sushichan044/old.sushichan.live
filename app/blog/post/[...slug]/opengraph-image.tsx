import { ImageResponse } from 'next/server'

import NextImage from '@/components/image/nextImage'
import { getMDXExistence, getMDXFrontMatter } from '@/lib/mdx'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default function Image({
  params: { slug },
}: {
  params: { slug: string[] }
}) {
  const mdxPath = slug.join('/')
  const mdx = getMDXExistence(mdxPath)
  if (!mdx.exists) {
    return
  }
  const { thumbnail, title } = getMDXFrontMatter(mdxPath, mdx.extension)
  if (!thumbnail) {
    return
  }

  return new ImageResponse(
    (
      <NextImage
        alt={title}
        height={size.height}
        src={thumbnail}
        width={size.width}
      />
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}
