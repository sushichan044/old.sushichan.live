import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'すしの雑記',
    template: '%s - すしの雑記',
  },
}

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div id="main-container">{children}</div>
}

// set this for production
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
// routes not included in generateStaticParams will go to 404
export const dynamicParams = false
