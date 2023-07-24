/* eslint-disable no-restricted-imports */
import path from 'path'

import type { MDXRoute } from '../../types/mdx'
import { getCwd } from '../../utils/fs'
import { globDirectories, globFilePathByExtensions } from '../../utils/glob'
import { normalizePathForGlob, normalizeRoute } from '../../utils/normalize'
import { getExtensionsRegex } from '../../utils/regex'
import { removeSideSlashes } from '../../utils/string'
import { isMDXFile } from '../../utils/type'
import { normalizeRouteFragment } from '../route/normalize'
import { MDXDirectory } from './class'
import { getMDXConfig } from './config'

const getMDXDirectory = async (
  directory: string,
  rootDirectory: string = directory
): Promise<MDXDirectory> => {
  const extRegexp = getExtensionsRegex(['.mdx', '.md'])
  const cwd = getCwd()
  const config = await getMDXConfig(directory)

  // define paths
  const targetAbsDir = path.join(cwd, directory)
  const rootAbsDir = path.join(cwd, rootDirectory)
  const relativePathFromCwd = path.relative(cwd, directory)
  const relativePathFromRoot = path.relative(rootAbsDir, directory)
  const baseRouteFragments = relativePathFromRoot.split(path.sep)
  if (config?.path) {
    baseRouteFragments.push(config.path)
  }
  // flatMap内でnormalizeしたくないので、先にbaseRouteのFragmentをnormalizeしておく
  const baseRoutes = baseRouteFragments.map(removeSideSlashes).flatMap((f) => {
    const normalized = normalizeRouteFragment(f)
    if (normalized === undefined) {
      return []
    }
    return [normalized]
  })

  // glob matters
  const mdxPaths = globFilePathByExtensions(normalizePathForGlob(directory), {
    extensions: ['.mdx', '.md'],
    absolute: true,
  })
  const childrenDirectories = globDirectories(normalizePathForGlob(directory))

  const directoryMetaData = {
    absolutePath: targetAbsDir,
    relativePathFromCwd: relativePathFromCwd,
    baseRoutes,
  }

  const routes: MDXRoute[] = mdxPaths.flatMap((absPath) => {
    const relPathFromCwd = path.relative(cwd, absPath)
    const fileName = path.relative(targetAbsDir, absPath)
    const extension = path.extname(absPath)
    if (!isMDXFile(extension)) return []

    // baseRoutesのFragmentはすべてnormalizeされている
    // normalizeしたrouteNameと結合して、その後routeの文字列をnormalizeする
    const routeName = normalizeRouteFragment(
      removeSideSlashes(fileName.replace(extRegexp, ''))
    )
    const normalizedRoute = normalizeRoute(
      [...baseRoutes, routeName && routeName].join('/')
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

  const children: MDXDirectory[] = await Promise.all(
    childrenDirectories.map(async (directory) => {
      const child = await getMDXDirectory(directory, rootDirectory)
      return child
    })
  )

  return new MDXDirectory(directoryMetaData, config, routes, children)
}

const p = getMDXDirectory('posts')
p.then((d) => {
  console.log(JSON.stringify(d, null, 2))
})

export { getMDXDirectory }
