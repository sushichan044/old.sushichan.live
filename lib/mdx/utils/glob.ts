import { glob } from 'glob'

// eslint-disable-next-line no-restricted-imports
// eslint-disable-next-line no-restricted-imports
import { normalizeExtension } from './normalize'
// eslint-disable-next-line no-restricted-imports
import { isNotEmptyArray } from './type'

const globFilePathByExtensions = (
  dir: string,
  {
    absolute,
    extensions,
  }: {
    absolute?: boolean
    extensions?: string[]
  } = {}
) => {
  const normalizedExtensions = extensions?.map((ext) => normalizeExtension(ext))
  const searchPattern = `${dir}/*${
    isNotEmptyArray(normalizedExtensions)
      ? `{${normalizedExtensions.join(',')}}`
      : ''
  }`
  return glob.sync(searchPattern, {
    nodir: true,
    absolute: absolute,
  })
}

const globDirectories = (dir: string) => {
  const searchPattern = `${dir}/*/`
  return glob.sync(searchPattern, {
    nodir: false,
    absolute: false,
  })
}

export { globFilePathByExtensions, globDirectories }
