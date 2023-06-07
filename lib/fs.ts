import fs from 'fs'
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
export const fileHasExtension = (
  file: string,
  expectedExtensions: string[]
): boolean => {
  const extWithDot = expectedExtensions.map((ext) =>
    ext.startsWith('.') ? ext : `.${ext}`
  )
  return extWithDot.some((ext) => file.endsWith(ext))
}

// TODO: cut out file judge logic from this function
export const recursiveGetFilepath = async (
  dir: string,
  ignorePattern?: RegExp,
  maxCount?: number,
  start?: number
): Promise<string[]> => {
  const recursiveFiles: string[] = []

  const checkFileName = (file: fs.Dirent): boolean => {
    if (ignorePattern && file.name.match(ignorePattern)) {
      return false
    }
    return true
  }
  const arrayIsPushable =
    maxCount && recursiveFiles.length >= maxCount ? false : true

  const files = await fs.promises.readdir(dir, { withFileTypes: true })
  await Promise.all(
    files.map(async (file) => {
      if (file.isDirectory()) {
        const subFiles = await recursiveGetFilepath(
          `${dir}/${file.name}`,
          ignorePattern
        )
        for (const subFile of subFiles) {
          if (!arrayIsPushable) {
            break
          }
          if (!checkFileName(file)) {
            continue
          }
          recursiveFiles.push(`${file.name}/${subFile}`)
        }
      } else {
        if (!arrayIsPushable || !checkFileName(file)) {
          return
        }
        recursiveFiles.push(file.name)
      }
    })
  )

  if (start) {
    return recursiveFiles.length >= start ? recursiveFiles.slice(start) : []
  }

  return recursiveFiles
}

export const getFileModifiedTime = async (filePath: string) => {
  const stat = await fs.promises.stat(filePath)
  return stat.mtime
}
