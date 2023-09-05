import Modal from '@/app/blog/components/modal'
import CloudinaryImage from '@/components/image/cloudinary'

type PageProps = {
  params: {
    id: string[]
  }
}

export default async function Page({ params: { id } }: PageProps) {
  const imageIdentifier = id.join('/')

  return (
    <Modal>
      <CloudinaryImage
        alt="image"
        height={800}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={`https://res.cloudinary.com/sushi-chan/image/upload/${imageIdentifier}`}
        width={800}
      />
    </Modal>
  )
}
