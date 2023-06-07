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
): string | null => {
  for (const ext of expectedExtensions) {
    // add '.' if not included
    const extWithDot = ext.startsWith('.') ? ext : `.${ext}`
    if (file.endsWith(extWithDot)) {
      return file
    }
  }
  return null
}

// TODO: cut out file judge logic from this function
export const recursiveGetFilepath = async (
  dir: string,
  ignorePattern?: RegExp,
  maxCount?: number,
  start?: number
): Promise<string[]> => {
  const recursiveFiles: string[] = []
  const files = await fs.promises.readdir(dir, { withFileTypes: true })
  const isTargetFile = (file: string) => {
    return ignorePattern ? !file.match(ignorePattern) : true
  }
  const filesIsMax = () => {
    return maxCount ? recursiveFiles.length >= maxCount : false
  }

  const ignoreAppliedFiles = files.filter((file) => isTargetFile(file.name))
  await Promise.all(
    ignoreAppliedFiles.map(async (file) => {
      if (file.isDirectory()) {
        const subFiles = await recursiveGetFilepath(
          `${dir}/${file.name}`,
          ignorePattern
        )
        for (const subFile of subFiles) {
          if (filesIsMax()) {
            break
          }
          recursiveFiles.push(`${file.name}/${subFile}`)
        }
      } else {
        if (isTargetFile(file.name)) {
          if (filesIsMax()) {
            return
          }
          recursiveFiles.push(file.name)
        }
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
