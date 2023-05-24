import Link from 'next/link'

export default async function Home() {
  return (
    <div id="main-container">
      <p>Hello World!</p>
      <p>こんにちは世界！</p>
      <Link href="/css-fukuwarai">
        <p>CSS福笑い(α版,スマホ未対応)</p>
      </Link>
    </div>
  )
}
