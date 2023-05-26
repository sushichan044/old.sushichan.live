'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} style={{ color: 'inherit' }}>
      <p>最後に閲覧していたページに戻る</p>
    </button>
  )
}
