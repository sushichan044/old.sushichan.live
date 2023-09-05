import { loadDefaultJapaneseParser } from 'budoux'
import React from 'react'

import styles from '@/components/common/budoux.module.scss'

const WithBudoux = ({ children }: { children?: React.ReactNode }) => {
  if (
    !children &&
    (typeof children !== 'string' ||
      typeof children !== 'object' ||
      !Array.isArray(children))
  ) {
    return <>{children}</>
  }

  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, i) => {
          if (typeof child === 'string') {
            return <React.Fragment key={i}>{parseString(child)}</React.Fragment>
          }
          if (typeof child === 'object') {
            return (
              <React.Fragment key={i}>{parseJSXObject(child)}</React.Fragment>
            )
          }
          return <React.Fragment key={i}>{child}</React.Fragment>
        })}
      </>
    )
  }

  if (typeof children === 'object') {
    return <>{parseJSXObject(children)}</>
  }

  if (typeof children === 'string') {
    return <>{parseString(children)}</>
  }

  return <>{children}</>
}

const parseString = (str: string) => {
  const parser = loadDefaultJapaneseParser()
  return (
    <span aria-label={str} role="document">
      <span aria-hidden className={styles.root}>
        {parser.parse(str).map((val, i) => (
          <span key={i}>{val}</span>
        ))}
      </span>
    </span>
  )
}

const parseJSXObject = (jsx: React.ReactNode) => {
  if (!jsx || typeof jsx !== 'object') {
    return jsx
  }

  const _children = { ...jsx }

  if (
    !(
      'type' in _children &&
      'props' in _children &&
      'children' in _children.props &&
      typeof _children.props.children === 'string'
    )
  ) {
    return jsx
  }

  const Tag = _children.type
  const parsedFragment = parseString(_children.props.children)
  const replacedJSX = <Tag {..._children.props}>{parsedFragment}</Tag>

  return replacedJSX
}

export default WithBudoux
