'use client'

import { css } from '@linaria/core'
import dynamic from 'next/dynamic'
import { useRef } from 'react'

import { parseCSS } from '@/app/css-fukuwarai/action'

export default async function Page() {
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
    const AST = await parseCSS(code)
    console.log(AST)
  }

  const mouth = css`
    width: 100px;
  `

  return (
    <>
      <Editor
        defaultLanguage="css"
        height="60vh"
        onChange={handleChange}
        width="50%"
      />
      <div>
        <button onClick={() => handleCode(codeRef.current)}>アヌアヌ</button>
        <span ref={fieldRef} />
      </div>
      <div className="face-root">
        <div className="face">
          <div className="right-eye">eye</div>
          <div className="left-eye">eye</div>
          <div className={mouth}>mouth</div>
        </div>
      </div>
    </>
  )
}
