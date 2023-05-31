type PageProps = {
  params: {
    tag: string
  }
}

export default async function Page({ params: { tag } }: PageProps) {
  const decodedTag = decodeURIComponent(tag)

  return (
    <div>
      <h1>Tag: {decodedTag}</h1>
    </div>
  )
}
1
