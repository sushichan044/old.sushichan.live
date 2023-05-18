import fs from 'fs'

type mdxMetaData = {
  title: string
  description: string
  date: string
}

const postsDir = `${process.cwd()}/posts`

export const getMDXMeta = async (fileName: string) => {
  const { meta } = await import(`/posts/${fileName}.mdx`)
  return meta as mdxMetaData
}

export const checkMDXExists = (fileName: string) => {
  return fs.existsSync(`${postsDir}/${fileName}.mdx`)
}

export const getAllMDXSlugs = async () => {
  return (await fs.promises.readdir(postsDir))
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.split('.')[0])
}
