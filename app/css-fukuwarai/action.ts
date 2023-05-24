'use server'

import { parse, Rule } from 'css'

const ALLOWED_SELECTORS = [
  '.face-root',
  '.face',
  '.left-eye',
  '.right-eye',
  '.nose',
  '.mouth',
] as const

export type ExtractedCSS = Omit<Rule, 'type' | 'selectors' | 'declarations'> & {
  type: 'rule'
  selectors: (typeof ALLOWED_SELECTORS)[number][]
  declarations: {
    type: 'declaration'
    property: string
    value: string
    position: {
      start: {
        line: number
        column: number
      }
      end: {
        line: number
        column: number
      }
    }
  }[]
}

export const parseCSS = async (code: string): Promise<string> => {
  const cssAST = parse(code)
  console.log('%j', cssAST)

  if (!cssAST.stylesheet) {
    throw new Error('CSS AST is not valid')
  }

  if (
    cssAST.stylesheet.parsingErrors &&
    cssAST.stylesheet.parsingErrors.length > 0
  ) {
    throw new Error(
      `CSS AST has some errors: ${JSON.stringify(
        cssAST.stylesheet.parsingErrors
      )}`
    )
  }
  const extracted = cssAST.stylesheet.rules
    .filter((rule): rule is Rule => rule.type === 'rule')
    .filter((rule) => {
      if (!rule.selectors) {
        return false
      }
      return rule.selectors.every((selector) =>
        ALLOWED_SELECTORS.some(
          (allowedSelector) => selector === allowedSelector
        )
      )
    }) as ExtractedCSS[]
  console.log('%j', extracted)

  return JSON.stringify(extracted)
}
