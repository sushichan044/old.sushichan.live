import { redirect } from 'next/navigation'

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string[] } }
) {
  const imageIdentifier = id.join('/')
  return redirect(
    `https://res.cloudinary.com/sushi-chan/image/upload/${imageIdentifier}`
  )
}
