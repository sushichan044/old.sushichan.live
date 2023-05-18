import { Lato, Noto_Sans_JP, Roboto } from 'next/font/google'

const lato = Lato({
  display: 'swap',
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
})

const notoSansJP = Noto_Sans_JP({
  display: 'swap',
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
})

const roboto = Roboto({
  display: 'swap',
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const fontVariables = [lato, notoSansJP, roboto]
  .map((font) => font.variable)
  .join(' ')
