export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div id="main-container">{children}</div>
}
