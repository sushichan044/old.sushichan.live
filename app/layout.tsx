import 'ress'
import '@/styles/globals.scss'
import '@/styles/mdx/rehype-toc.scss'
import '@/styles/mdx/gfm-footnote.scss'
import '@/styles/syntax-highlight.scss'
import 'katex/dist/katex.min.css'

import { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Favicons from '@/components/meta/favicons'
import GeneralMetaData from '@/components/meta/general'
import TwitterScript from '@/components/meta/twitterScript'
import { fontVariables } from '@/lib/font'

export const metadata: Metadata = {
  metadataBase: new URL('https://sushichan.live'),
  title: {
    default: 'sushichan.live',
    template: '%s - sushichan.live',
  },
  description: 'インターネット寿司屋',
  openGraph: {
    url: '/',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary',
    site: '@sushi_chan_sub',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <GeneralMetaData />
      <Favicons />
      <body className={fontVariables}>
        <NextTopLoader color="#2b78dd" showSpinner={false} />
        <Header />
        <main>{children}</main>
        <Footer />
        <TwitterScript />
      </body>
    </html>
  )
}
