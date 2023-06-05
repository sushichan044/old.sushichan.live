'use client'

import React, { useEffect, useRef } from 'react'

export const Tweet: React.FC<{ id: string; theme: 'dark' | 'light' }> = ({
  id,
  theme,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // @ts-expect-error twttr is not defined
    window.twttr?.widgets.load(ref.current)
  }, [id])

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<blockquote class="twitter-tweet" data-lang="ja" data-theme="${theme}"><a href="https://twitter.com/i/status/${id}"></a></blockquote>`,
      }}
      ref={ref}
    />
  )
}
