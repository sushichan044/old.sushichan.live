const isProduction = process.env.NODE_ENV === 'production'
const isBrowser = typeof window !== 'undefined'
const isAnalyzeBuild = process.env.ANALYZE === 'true'

export { isProduction, isBrowser, isAnalyzeBuild }
