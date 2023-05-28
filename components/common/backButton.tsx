'use client'
import { useRouter } from 'next/navigation'

import Button from '@/components/common/button'

export default function BackButton() {
  const router = useRouter()

  return (
    <Button onClick={() => router.back()}>
      <p>最後に閲覧していたページに戻る</p>
    </Button>
  )
}
