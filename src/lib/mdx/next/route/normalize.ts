// eslint-disable-next-line no-restricted-imports
import { bracePathRegExp } from '../../utils/regex'

const normalizeRouteFragment = (fragment: string): string | undefined => {
  if (bracePathRegExp.test(fragment)) {
    return undefined
  }
  if (fragment === '') {
    return undefined
  }
  return fragment
}

export { normalizeRouteFragment }
