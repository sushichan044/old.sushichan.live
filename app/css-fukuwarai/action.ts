'use server'

import { parse } from 'css'

export const parseCSS = async (code: string): Promise<string> => {
  const cssAST = parse(code)
  console.log(cssAST)
  // TODO: parse AST Here

  const parsedCSS = 'アヌアヌ'
  return parsedCSS
}
