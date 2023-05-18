import fs from 'fs'

type mdxMetaData = {
  title: string
  description: string
  date: string
}

export const getMDXMeta = async (fileName: string) => {
  const { meta } = await import(`/posts/${fileName}.mdx`)
  return meta as mdxMetaData
}

export const checkMDXExists = (fileName: string) => {
  return fs.existsSync(`${process.cwd()}/posts/${fileName}.mdx`)
}
