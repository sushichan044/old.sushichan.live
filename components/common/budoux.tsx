import { loadDefaultJapaneseParser } from 'budoux'

const WithBudoux = ({ children }: { children: string }) => {
  const parser = loadDefaultJapaneseParser()

  return (
    <>
      {parser.parse(children).map((val, i) => (
        <span key={i} style={{ display: 'inline-block' }}>
          {val}
        </span>
      ))}
    </>
  )
}

export default WithBudoux
