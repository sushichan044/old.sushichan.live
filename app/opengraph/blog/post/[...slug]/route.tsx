import { ImageResponse } from 'next/server'

import { getMDXExistence, getMDXFrontMatter } from '@/lib/mdx'

// Image metadata
const size = {
  width: 1200,
  height: 630,
}

// Image generation
export function GET(
  request: Request,
  {
    params: { slug },
  }: {
    params: { slug: string[] }
  }
) {
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
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={title}
        height={size.height}
        src={thumbnail}
        style={{ objectFit: 'cover' }}
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
