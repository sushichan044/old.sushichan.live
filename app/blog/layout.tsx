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
