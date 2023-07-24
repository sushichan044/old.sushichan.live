import { sep } from 'path'

// eslint-disable-next-line no-restricted-imports
import { tailSepRegExp, trailingSlashRegExp } from './regex'

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
  const headNormalized = path.startsWith('/') ? path : `/${path}`
  const tailNormalized = removeTrailSlash(headNormalized)
  return tailNormalized
}

const removeTrailSlash = (path: string) => path.replace(trailingSlashRegExp, '')

export {
  normalizeExtension,
  normalizePath,
  normalizeRoute,
  normalizePathForGlob,
}
