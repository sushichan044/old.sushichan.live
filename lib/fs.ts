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
    if (!file.startsWith('.')) {
      file = `.${file}`
    }

    if (file.endsWith(ext)) {
      return file
    }
  }
  return null
}

export const recursiveGetFilepath = async (dir: string): Promise<string[]> => {
  const recursiveFiles: string[] = []
  const files = await fs.promises.readdir(dir, { withFileTypes: true })
  await Promise.all(
    files.map(async (file) => {
      if (file.isDirectory()) {
        const subFiles = await recursiveGetFilepath(`${dir}/${file.name}`)
        subFiles.forEach((subFile) => {
          recursiveFiles.push(`${file.name}/${subFile}`)
        })
      } else {
        recursiveFiles.push(file.name)
      }
    })
  )
  return recursiveFiles
}
