// eslint-disable-next-line no-restricted-imports
import { bracePathRegExp } from '../../utils/regex'

const normalizeRouteFragments = (fragments: string[]): string[] => {
  return fragments.flatMap((f) => {
    if (bracePathRegExp.test(f)) {
      return []
    }
    return [f]
  })
}

export { normalizeRouteFragments }
