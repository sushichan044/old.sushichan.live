'use client'
import ieBuster from 'ie-buster'
import { useEffect } from 'react'

const IEBuster = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    ieBuster.init({
      appStyles: {
        top: '80px',
      },
    })

    return () => {
      ieBuster.clear()
    }
  }, [])

  return <></>
}

export default IEBuster
