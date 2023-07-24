// path with brace like (post) will be ignored in normalizing process
export const bracePathRegExp = /^\([\w\-]+\)$/

// ignore files and directories that start with `_`
export const ignoredPathRegExp = /^_[\w\-]+$/

// returns regex that matches the given extensions
export const getExtensionsRegex = (extensions: string[]): RegExp => {
  return new RegExp(`(${extensions.join('|')})$`)
}
