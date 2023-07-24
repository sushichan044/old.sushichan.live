import { sep } from 'path'

const normalizeExtension = (ext: string) =>
  ext.startsWith('.') ? ext : `.${ext}`

const normalizePath = (path: string) =>
  path.startsWith(sep) ? path : sep + path

const normalizeRoute = (path: string) =>
  path.startsWith('/') ? path : `/${path}`

export { normalizeExtension, normalizePath, normalizeRoute }
