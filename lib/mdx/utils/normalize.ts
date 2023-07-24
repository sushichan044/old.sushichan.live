const normalizeExtension = (ext: string) =>
  ext.startsWith('.') ? ext : `.${ext}`

const normalizePath = (path: string) =>
  path.startsWith('/') ? path : `/${path}`

export { normalizeExtension, normalizePath }
