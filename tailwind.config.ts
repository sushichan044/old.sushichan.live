import type { Config } from 'tailwindcss'

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/**/*.{js,ts,jsx,tsx,md,mdx}',
    './posts/**/*.{js,ts,jsx,tsx,md,mdx}',
    './md/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '1200/630': '1200 / 630',
        '16/9': '16 / 9',
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '1/1': '1 / 1',
      },
    },
  },
  plugins: [],
}

export default config
