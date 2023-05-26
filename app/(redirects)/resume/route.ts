import { redirect } from 'next/navigation'

export async function GET() {
  return redirect('https://www.resume.id/sushi_chaaaan')
}

export const runtime = 'edge'
