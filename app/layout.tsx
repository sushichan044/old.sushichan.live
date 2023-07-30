import 'ress'
import '@/styles/globals.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/mdx/rehype-toc.scss'
import '@/styles/mdx/gfm-footnote.scss'
import '@/styles/syntax-highlight.scss'
import 'katex/dist/katex.min.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Favicons from '@/components/meta/favicons'
import GeneralMetaData from '@/components/meta/general'
import TwitterScript from '@/components/meta/twitterScript'
import { fontVariables } from '@/lib/font'

// font awesome config
config.autoAddCss = false
library.add(fab, fas, far)

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
    site: '@sushi_chan_dev',
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
