import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const id = request.url.substring(request.url.lastIndexOf('/') + 1)
  console.log(id)
  const url = new URL(
    `https://imagedelivery.net/i4QA6VLSP0gXyj6-3zNFXg/${id}/public`
  )
  return NextResponse.redirect(url)
}

export const runtime = 'edge'
