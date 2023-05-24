'use client'

import { css } from '@linaria/core'
// import { editor } from 'monaco-editor'
// import { KeyCode, KeyMod } from 'monaco-editor/esm/vs/editor/editor.api'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'

// import { ExtractedCSS, parseCSS } from '@/app/css-fukuwarai/action'

export default async function Page() {
  const [fukuCSS, setFukuCSS] = useState<string>('')
  const codeRef = useRef<string>('')
  const fieldRef = useRef<HTMLSpanElement>(null)

  const Editor = dynamic(async () => import('@monaco-editor/react'), {
    ssr: false,
  })

  const handleChange = (value: string | undefined) => {
    if (!value) return
    codeRef.current = value
  }

  const handleCode = async (code: string) => {
    if (!fieldRef.current) return
    fieldRef.current.innerHTML = code
    setFukuCSS(code)
    // const parsed = JSON.stringify(
    //   await parseCSS(code)
    // ) as unknown as ExtractedCSS[]
    // console.log(parsed)
    // buildCSS(parsed)
  }

  // const buildCSS = (css: ExtractedCSS[]) => {
  //   const result = css
  //     .map(({ selectors, declarations }) => {
  //       const selector = selectors.join(',')
  //       const property = declarations
  //         .map(({ property, value }) => {
  //           return `${property}:${value}`
  //         })
  //         .join(';')
  //       return `${selector}{${property}}`
  //     })
  //     .join('')
  //   console.log(result)
  //   setFukuCSS(result)
  // }

  const fukuwaraiCSS = css`
    ${fukuCSS}
  `

  return (
    <>
      <Editor
        defaultLanguage="css"
        height="60vh"
        onChange={handleChange}
        // onMount={(editor: editor.IStandaloneCodeEditor) => {
        //   editor.addCommand(
        //     KeyMod.CtrlCmd | KeyCode.KeyS,
        //     () => handleCode(codeRef.current),
        //     ''
        //   )
        // }}
        width="50%"
      />
      <div>
        <button onClick={() => handleCode(codeRef.current)}>アヌアヌ</button>
        <span ref={fieldRef} />
      </div>
      <div className={fukuwaraiCSS}>
        <div className="face-root">
          <div className="face">
            <div className="right-eye">eye</div>
            <div className="left-eye">eye</div>
            <div className="mouth">mouth</div>
          </div>
        </div>
      </div>
    </>
  )
}
