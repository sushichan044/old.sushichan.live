/* eslint-disable no-restricted-imports */
import path from 'path'

import type { MDXRoute } from '../../types/mdx'
import { getCwd } from '../../utils/fs'
import { globDirectories, globFilePathByExtensions } from '../../utils/glob'
import { normalizeRoute } from '../../utils/normalize'
import { getExtensionsRegex } from '../../utils/regex'
import { isMDXFile } from '../../utils/type'
import { normalizeRouteFragments } from '../route/normalize'
import { MDXDirectory } from './class'
import { getMDXConfig } from './config'

const getMDXDirectory = async (
  directory: string,
  rootDirectory: string = directory
): Promise<MDXDirectory> => {
  const extRegexp = getExtensionsRegex(['.mdx', '.md'])
  const cwd = getCwd()

  const targetAbsDir = path.join(cwd, directory)
  const rootAbsDir = path.join(cwd, rootDirectory)
  const relativePathFromCwd = path.relative(cwd, directory)
  const relativePathFromRoot = path.relative(rootAbsDir, directory)
  const baseRoutes = normalizeRouteFragments(
    relativePathFromRoot.split(path.sep)
  )

  const directoryMetaData = {
    absolutePath: targetAbsDir,
    relativePathFromCwd: relativePathFromCwd,
    baseRoutes,
  }
  const config = await getMDXConfig(directory)
  const mdxPaths = globFilePathByExtensions(directory, {
    extensions: ['.mdx', '.md'],
    absolute: true,
  })

  const routes: MDXRoute[] = mdxPaths.flatMap((absPath) => {
    const relPathFromCwd = path.relative(cwd, absPath)
    const fileName = path.relative(targetAbsDir, absPath)
    const extension = path.extname(absPath)
    if (!isMDXFile(extension)) return []

    const routeName = fileName.replace(extRegexp, '')
    const normalizedRoute = normalizeRoute(
      normalizeRouteFragments([...baseRoutes, routeName]).join('/')
    )

    return [
      {
        absolutePath: absPath,
        relativePathFromCwd: relPathFromCwd,
        directory: directory,
        fileName,
        extension,
        normalizedRoute,
      },
    ]
  })

  const childrenDirectories = globDirectories(directory)
  const children: MDXDirectory[] = await Promise.all(
    childrenDirectories.map(async (directory) => {
      const child = await getMDXDirectory(directory, rootDirectory)
      return child
    })
  )

  return new MDXDirectory(directoryMetaData, config, routes, children)
}

// const p = getMDXDirectory('posts')
// p.then((d) => {
//   console.log(JSON.stringify(d, null, 2))
// })

export { getMDXDirectory }
