import fs from 'fs'
import { glob } from 'glob'
/**
 * check if file has one of the expected extensions.
 * @param {string} file file name. e.g. `index.mdx`.
 * @param {string []} expectedExtensions
 * * list of expected extensions. e.g. `['.mdx', '.md']`.
 * * If the extension do not started with `'.'`, it will be automatically added.
 * * e.g. `['mdx', 'md']` will be converted to `['.mdx', '.md']`.
 * @returns {string | null} file name with extension or null if not found.
 * @example
 * fileHasExtension('index.mdx', ['.mdx', '.md']) // returns 'index.mdx'
 * fileHasExtension('index.zip', ['.mdx', '.md']) // returns null
 */
export const hasExtension = (
  file: string,
  expectedExtensions: string[]
): boolean => {
  const extWithDot = expectedExtensions.map((ext) =>
    ext.startsWith('.') ? ext : `.${ext}`
  )
  return extWithDot.some((ext) => file.endsWith(ext))
}

export const getFilePathRecursive = ({
  dir,
  absolute = false,
}: {
  dir: string
  absolute?: boolean
}) => {
  return glob.sync(`${dir}/**/*`, {
    nodir: true,
    posix: true,
    absolute: absolute,
    ignore: ['**/_*/**'],
  })
}

export const getFileModifiedTime = async (filePath: string) => {
  const stat = await fs.promises.stat(filePath)
  return stat.mtime
}

export const getFileModifiedTimeSync = (filePath: string) => {
  const stat = fs.statSync(filePath)
  return stat.mtime
}

export const getFileTimestampsSync = (filePath: string) => {
  const stat = fs.statSync(filePath)
  return {
    created: stat.birthtime,
    modified: stat.mtime,
  }
}
