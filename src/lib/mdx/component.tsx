// eslint-disable-next-line no-restricted-imports
import { compileMDX } from './compiler'
// eslint-disable-next-line no-restricted-imports
import type { MDXOption } from './types'

const MdxRenderer = async (props: MDXOption) => {
  const compiled = await compileMDX(props)

  return <>{compiled}</>
}

export default MdxRenderer
