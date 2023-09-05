'use client'

import React, { useEffect, useRef } from 'react'

export const TimelineEmbed: React.FC<{
  id: string
  theme: 'dark' | 'light'
}> = ({ id, theme }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // @ts-expect-error twttr is not defined
    window.twttr?.widgets.load(ref.current)
  }, [id])

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: generateEmbedHtml(id, theme),
      }}
      ref={ref}
      style={{ textAlign: 'center' }}
    />
  )
}

const generateEmbedHtml = (id: string, theme: 'dark' | 'light'): string => {
  return `<a class="twitter-timeline" data-height="450" data-lang="ja" data-theme="${theme}" href="https://twitter.com/${id}?ref_src=twsrc%5Etfw">Tweets by ${id}</a>`
}
