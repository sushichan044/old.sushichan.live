import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const nextUrl = request.nextUrl
  nextUrl.searchParams.delete('id')
  console.log(nextUrl)
  const id = nextUrl.pathname.substring(nextUrl.pathname.lastIndexOf('/') + 1)
  redirect(`https://imagedelivery.net/i4QA6VLSP0gXyj6-3zNFXg/${id}/public`)
}

export const runtime = 'edge'
