export default async function imageLayout(props: { modal: React.ReactNode }) {
  return <div id="main-container">{props.modal}</div>
}

// for cloudflare pages
export const runtime = 'edge'
