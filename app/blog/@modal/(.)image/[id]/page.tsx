import Modal from '@/app/blog/components/modal'
import NextImage from '@/components/image/nextImage'

type PageProps = {
  params: {
    id: string
  }
}

export default async function Page({ params: { id } }: PageProps) {
  return (
    <Modal>
      <NextImage
        alt="image"
        height={800}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={`https://imagedelivery.net/i4QA6VLSP0gXyj6-3zNFXg/${id}/public`}
        width={800}
      />
    </Modal>
  )
}
