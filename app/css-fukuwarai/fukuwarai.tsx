'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { styled } from 'styled-components'

import styles from '@/app/css-fukuwarai/fukuwarai.module.scss'

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

  const defaultCSS = `.face {
  display: grid;
  grid-template:
    "a b c" 1fr
    "d e f" 1fr
    "g h i" 1fr / 1fr 1fr 1fr;
  align-items: center;
  height: 100%;
  font-size: 4rem;
  text-align: center;
}

.right-eye {
  grid-area: a;
}

.left-eye {
  grid-area: c;
}

.nose {
  grid-area: e;
}

.mouth {
  grid-area: h;
}
`

  return (
    <div className={styles.container}>
      <Editor
        defaultLanguage="css"
        defaultValue={defaultCSS}
        height="100%"
        onChange={handleChange}
        onMount={() => {
          setFukuCSS(defaultCSS)
        }}
        options={{
          fontSize: 16,
        }}
        theme="vs-dark"
      />
      <FaceRootDiv className={styles['fuku-root']} css={fukuCSS}>
        <div className="face">
          <div className="right-eye">右目</div>
          <div className="left-eye">左目</div>
          <div className="nose">鼻</div>
          <div className="mouth">口</div>
        </div>
      </FaceRootDiv>
    </div>
  )
}
