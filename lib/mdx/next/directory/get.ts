import path from 'path'

// eslint-disable-next-line no-restricted-imports
import type { MDXRoute } from '../../types/mdx'
// eslint-disable-next-line no-restricted-imports
import { getCwd } from '../../utils/fs'
// eslint-disable-next-line no-restricted-imports
import { globDirectories, globFilePathByExtensions } from '../../utils/glob'
// eslint-disable-next-line no-restricted-imports
import { bracePathRegExp, getExtensionsRegex } from '../../utils/regex'
// eslint-disable-next-line no-restricted-imports
import { isMDXFile } from '../../utils/type'
// eslint-disable-next-line no-restricted-imports
import { MDXDirectory } from './class'
// eslint-disable-next-line no-restricted-imports
import { getMDXConfig } from './config'

const getMDXDirectory = async (dirPath: string): Promise<MDXDirectory> => {
  const cwd = getCwd()
  const targetAbsDir = path.join(cwd, dirPath)
  const extRegexp = getExtensionsRegex(['.mdx', '.md'])

  const directoryMetaData = {
    absolutePath: path.resolve(dirPath),
    relativePath: path.relative(cwd, dirPath),
  }

  const config = await getMDXConfig(dirPath)
  const mdxPaths = globFilePathByExtensions(dirPath, {
    extensions: ['.mdx', '.md'],
    absolute: true,
  })

  const routes: MDXRoute[] = mdxPaths.flatMap((absPath) => {
    const relPathFromCwd = path.relative(cwd, absPath)
    const relPathFromRoot = path.relative(targetAbsDir, absPath)
    const extension = path.extname(absPath)
    if (!isMDXFile(extension)) return []

    const baseRoute = relPathFromRoot.replace(extRegexp, '')
    const routeFragment = baseRoute.split('/')
    const normalizedRoute = routeFragment
      .flatMap((f) => {
        if (bracePathRegExp.test(f)) {
          return []
        }
        return [f]
      })
      .join('/')

    return [
      {
        rootDirectory: dirPath,
        fileName: relPathFromRoot,
        extension,
        absolutePath: absPath,
        relativePath: relPathFromCwd,
        dirname: path.dirname(relPathFromCwd),
        baseRoute,
        normalizedRoute,
      },
    ]
  })

  const childrenDirectories = globDirectories(dirPath)
  const children: MDXDirectory[] = await Promise.all(
    childrenDirectories.map(async (directory) => {
      const child = await getMDXDirectory(directory)
      return child
    })
  )

  return new MDXDirectory(directoryMetaData, routes, config, children)
}

export { getMDXDirectory }
