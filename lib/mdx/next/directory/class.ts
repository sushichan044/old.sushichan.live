// eslint-disable-next-line no-restricted-imports
import { MDXConfig, MDXDirectoryInterface, MDXRoute } from '../../types'

class MDXDirectory implements MDXDirectoryInterface {
  constructor(
    public directoryMetaData: {
      absolutePath: string
      relativePathFromCwd: string
      baseRoutes: string[]
    },

    public config: MDXConfig | undefined,
    public routes: MDXRoute[],
    public children: MDXDirectory[]
  ) {}

  public getAllMDXRoutes(): MDXRoute[] {
    throw new Error('Method not implemented.')
  }
}

export { MDXDirectory }
