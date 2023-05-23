'use client'

import { editor } from 'monaco-editor'
import dynamic from 'next/dynamic'
import { useState } from 'react'

export default async function Page() {
  const [code, setCode] = useState('')

  const Editor = dynamic(import('@monaco-editor/react'), { ssr: false })

  const handleChange = (
    value: string | undefined,
    event: editor.IModelContentChangedEvent
  ) => {
    if (!value || !event.isEolChange) return
    console.log(value)
    setCode(value)
  }

  return (
    <>
      <Editor
        defaultLanguage="css"
        height="60vh"
        onChange={handleChange}
        width="50%"
      />
      <div>
        <span>アヌアヌ</span>
        {code}
      </div>
    </>
  )
}
