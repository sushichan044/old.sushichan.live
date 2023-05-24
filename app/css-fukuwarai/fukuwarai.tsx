'use client'

// import { editor } from 'monaco-editor'
// import { KeyCode, KeyMod } from 'monaco-editor/esm/vs/editor/editor.api'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { styled } from 'styled-components'

// import { ExtractedCSS, parseCSS } from '@/app/css-fukuwarai/action'

const FaceRootDiv = styled.div<{ css: string }>`
  ${(props) => props.css}
`

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
})

export default function Fukuwarai() {
  const [fukuCSS, setFukuCSS] = useState('')

  let applyCssTimer: NodeJS.Timeout | null = null
  const applyCss = (css: string) => {
    if (applyCssTimer) clearTimeout(applyCssTimer)
    applyCssTimer = setTimeout(() => {
      setFukuCSS(css)
    }, 500)
  }
  const handleChange = (value: string | undefined) => {
    applyCss(value || '')
  }

  return (
    <>
      <Editor
        defaultLanguage="css"
        height="60vh"
        onChange={handleChange}
        width="50%"
      />
      <FaceRootDiv css={fukuCSS}>
        <div className="face">
          <div className="right-eye">eye</div>
          <div className="left-eye">eye</div>
          <div className="mouth">mouth</div>
        </div>
      </FaceRootDiv>
    </>
  )
}
