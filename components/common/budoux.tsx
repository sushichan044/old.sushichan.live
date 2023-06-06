import { loadDefaultJapaneseParser } from 'budoux'

import styles from '@/components/common/budoux.module.scss'

const WithBudoux = ({ children }: { children?: string }) => {
  if (!children || children === '') {
    return <></>
  }

  const parser = loadDefaultJapaneseParser()

  return (
    <>
      {parser.parse(children).map((val, i) => (
        <span className={styles.span} key={i}>
          {val}
        </span>
      ))}
    </>
  )
}

export default WithBudoux
