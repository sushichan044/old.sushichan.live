import fs from 'fs'

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
