import { Fira_Code, Noto_Sans_JP, Roboto } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
})

const roboto = Roboto({
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

const firaCode = Fira_Code({
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-fira-code',
})

export const fontVariables = [notoSansJP, roboto, firaCode]
  .map((font) => font.variable)
  .join(' ')
