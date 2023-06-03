import 'client-only'

import { useEffect, useState } from 'react'

const useClientSize = (initialWidth?: number, initialHeight?: number) => {
  const [width, setWidth] = useState<number>(initialWidth || 0)
  const [height, setHeight] = useState<number>(initialHeight || 0)

  useEffect(() => {
    const onResize = () => {
      setWidth(document.documentElement.clientWidth)
      setHeight(document.documentElement.clientHeight)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  return { width, height }
}

export default useClientSize
