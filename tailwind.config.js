/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './posts/**/*.{js,ts,jsx,tsx,md,mdx}',
    './md/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
