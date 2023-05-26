import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const id = request.url.substring(request.url.lastIndexOf('/') + 1)
  const url =
    'https://imagedelivery.net/i4QA6VLSP0gXyj6-3zNFXg/' + id + '/public'
  redirect(url)
}
