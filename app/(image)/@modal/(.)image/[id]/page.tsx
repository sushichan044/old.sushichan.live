import NextImage from '@/components/image/nextImage'

type PageProps = {
  params: {
    id: string
  }
}

export default async function Page({ params: { id } }: PageProps) {
  return (
    <>
      <h1>Image Modal</h1>
      <NextImage
        alt="image"
        height={800}
        src={`https://imagedelivery.net/i4QA6VLSP0gXyj6-3zNFXg/${id}/public`}
        width={800}
      />
    </>
  )
}
