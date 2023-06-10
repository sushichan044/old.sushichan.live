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
export const hasExtension = (
  file: string,
  expectedExtensions: string[]
): boolean => {
  const extWithDot = expectedExtensions.map((ext) =>
    ext.startsWith('.') ? ext : `.${ext}`
  )
  return extWithDot.some((ext) => file.endsWith(ext))
}

export const findFilesRecursive = async (
  dir: string,
  ignorePattern?: RegExp,
  maxCount?: number,
  start?: number
): Promise<string[]> => {
  const foundFiles: string[] = []

  const checkFileName = (file: fs.Dirent): boolean => {
    if (ignorePattern && file.name.match(ignorePattern)) {
      return false
    }
    return true
  }
  const arrayIsPushable =
    maxCount && foundFiles.length >= maxCount ? false : true

  const files = await fs.promises.readdir(dir, { withFileTypes: true })
  await Promise.all(
    files.map(async (file) => {
      if (file.isDirectory()) {
        const subFiles = await findFilesRecursive(
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
          foundFiles.push(`${file.name}/${subFile}`)
        }
      } else {
        if (!arrayIsPushable || !checkFileName(file)) {
          return
        }
        foundFiles.push(file.name)
      }
    })
  )

  if (start) {
    return foundFiles.length >= start ? foundFiles.slice(start) : []
  }

  return foundFiles
}

export const getFileModifiedTime = async (filePath: string) => {
  const stat = await fs.promises.stat(filePath)
  return stat.mtime
}

export const getFileModifiedTimeSync = (filePath: string) => {
  const stat = fs.statSync(filePath)
  return stat.mtime
}
