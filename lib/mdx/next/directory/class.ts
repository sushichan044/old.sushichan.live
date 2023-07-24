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
    // TODO: 必ずnormalizedRouteの衝突を考慮した実装にする
    // すでにnormalizedRouteが存在する場合はエラーを必ず出す
    throw new Error('Method not implemented.')
  }
}

export { MDXDirectory }
