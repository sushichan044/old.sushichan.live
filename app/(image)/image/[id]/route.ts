import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const id = request.url.substring(request.url.lastIndexOf('/') + 1)
  console.log(id)
  const url = new URL(
    `https://imagedelivery.net/i4QA6VLSP0gXyj6-3zNFXg/${id}/public`
  )
  url.searchParams.delete('id')
  redirect(url.toString())
}

export const runtime = 'edge'
