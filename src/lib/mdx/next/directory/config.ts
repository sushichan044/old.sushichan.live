import fs from 'fs'
import path from 'path'

// eslint-disable-next-line no-restricted-imports
import type { MDXConfig } from '../../types'
// eslint-disable-next-line no-restricted-imports
import { declareLet } from '../../utils/let'

const getMDXConfig = async (p: string): Promise<MDXConfig | undefined> => {
  const importPath = path.resolve(p, 'mdx.config')
  const exists = configExists(p)
  if (!exists) return undefined

  const { default: configFile } = await import(importPath)
  const config = declareLet(() => {
    const config: MDXConfig = {
      path: undefined,
      tags: undefined,
    }
    if (typeof configFile !== 'object') {
      console.warn('invalid config file')
      return
    }
    config.path = configFile?.path
    config.tags = configFile?.tags
    return config
  })
  return config
}

const configExists = (p: string): boolean => {
  const fullPaths = [
    path.resolve(p, 'mdx.config.ts'),
    path.resolve(p, 'mdx.config.js'),
  ]
  try {
    for (const p of fullPaths) {
      if (fs.existsSync(p)) {
        return true
      }
    }
  } catch (e) {
    console.error(e)
  }
  return false
}

export { getMDXConfig }
