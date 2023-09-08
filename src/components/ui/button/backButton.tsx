'use client'
import { useRouter } from 'next/navigation'

import ArrowButton from '@/components/ui/button/arrowButton'

export default function BackButton() {
  const router = useRouter()

  return (
    <ArrowButton onClick={() => router.back()} role="button" showBackArrow>
      <p>ひとつ前のページに戻る</p>
    </ArrowButton>
  )
}
