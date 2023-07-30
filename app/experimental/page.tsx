import Tabs from '@/components/tabs'

export default async function Page() {
  return (
    <>
      <Tabs
        items={[
          {
            label: {
              internal: 'dev',
              external: 'As developer',
            },
            content: <div>Profile as Developer</div>,
          },
          {
            label: {
              internal: 'otaku',
              external: 'As オタク',
            },
            content: <div>Profile as Otaku</div>,
          },
        ]}
      />
    </>
  )
}
