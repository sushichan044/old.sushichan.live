import { sep } from 'path'

// eslint-disable-next-line no-restricted-imports
import { tailSepRegExp } from './regex'
// eslint-disable-next-line no-restricted-imports
import { addLeadingSlash, removeTrailingSlash } from './string'

const normalizeExtension = (ext: string) =>
  ext.startsWith('.') ? ext : `.${ext}`

const normalizePath = (path: string) => {
  const headNormalized = path.startsWith(sep) ? path : sep + path
  const tailNormalized = headNormalized.endsWith(sep)
    ? path.replace(tailSepRegExp, '')
    : path
  return tailNormalized
}

// glob pattern only works with `/` as separator in default
// https://github.com/isaacs/node-glob#options
const normalizePathForGlob = (path: string) =>
  path.split(sep).join('/').replace(tailSepRegExp, '')

const normalizeRoute = (path: string) => {
  const headNormalized = addLeadingSlash(path)
  const tailNormalized = removeTrailingSlash(headNormalized)
  return tailNormalized
}

export {
  normalizeExtension,
  normalizePath,
  normalizeRoute,
  normalizePathForGlob,
}
