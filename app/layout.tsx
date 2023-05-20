import 'ress'
import '@/styles/globals.scss'
import '@/styles/syntax-highlight.scss'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { fontVariables } from '@/lib/font'

export const metadata = {
  title: {
    default: 'すし.らいぶ',
    template: '%s - すし.らいぶ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={fontVariables}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
