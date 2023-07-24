import { sep } from 'path'

// path with brace like (post) will be ignored in normalizing process
export const bracePathRegExp = /^\([\w\-]+\)$/

// ignore files and directories that start with `_`
export const ignoredPathRegExp = /^_[\w\-]+$/

export const tailSepRegExp = new RegExp(`${sep}$`)

export const trailingSlashRegExp = /\/$/

// returns regex that matches the given extensions
export const getExtensionsRegex = (extensions: string[]): RegExp => {
  return new RegExp(`(${extensions.join('|')})$`)
}
