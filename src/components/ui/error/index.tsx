'use client'

import { useSearchParams } from 'next/navigation'

const ErrorComponent = () => {
  const params = useSearchParams()
  const search = params.get('search')
  if (!search) throw new Error('search query returned null')

  return (
    <div>
      <p>500 Server Error</p>
    </div>
  )
}

export default ErrorComponent
