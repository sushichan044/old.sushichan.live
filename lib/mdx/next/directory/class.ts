// eslint-disable-next-line no-restricted-imports
import { MDXConfig, MDXDirectoryInterface, MDXRoute } from '../../types'

class MDXDirectory implements MDXDirectoryInterface {
  constructor(
    public directoryMetaData: {
      absolutePath: string
      relativePath: string
    },

    public routes: MDXRoute[],
    public config: MDXConfig | undefined,
    public children: MDXDirectory[]
  ) {}

  public getAllMDXRoutes(): MDXRoute[] {
    throw new Error('Method not implemented.')
  }
}

export { MDXDirectory }
