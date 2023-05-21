import 'client-only'

import { useEffect, useState } from 'react'

const useAdjustedSize = (
  width: number,
  height: number,
  target: 'width' | 'height' = 'width'
) => {
  const targetIsWidth = target === 'width'

  const [baseSize, setBaseSize] = useState(targetIsWidth ? width : height)

  useEffect(() => {
    const onResize = () => {
      const clientSize = targetIsWidth
        ? document.documentElement.clientWidth
        : document.documentElement.clientHeight
      setBaseSize(clientSize)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  return {
    width: targetIsWidth ? baseSize : height * (baseSize / width),
    height: targetIsWidth ? height * (baseSize / width) : baseSize,
  }
}

export default useAdjustedSize
