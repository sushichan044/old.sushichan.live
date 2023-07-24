// eslint-disable-next-line no-restricted-imports
import { leadingSlashRegExp, trailingSlashRegExp } from './regex'

const removeLeadingSlash = (path: string) => {
  return path.replace(leadingSlashRegExp, '')
}

const removeTrailingSlash = (path: string) => {
  return path.replace(trailingSlashRegExp, '')
}

const removeSideSlashes = (path: string) => {
  return removeLeadingSlash(removeTrailingSlash(path))
}

const addLeadingSlash = (path: string) => {
  return path.startsWith('/') ? path : `/${path}`
}

const addTrailingSlash = (path: string) => {
  return path.endsWith('/') ? path : `${path}/`
}

const addSideSlashes = (path: string) => {
  return addLeadingSlash(addTrailingSlash(path))
}

export {
  removeLeadingSlash,
  removeTrailingSlash,
  removeSideSlashes,
  addLeadingSlash,
  addTrailingSlash,
  addSideSlashes,
}
