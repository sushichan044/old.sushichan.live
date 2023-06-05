import Link from 'next/link'

// import { TbArrowUpRight } from 'react-icons/tb'
import styles from '@/components/mdx/link.module.scss'
type Props = React.ComponentProps<'a'> & {
  children: React.ReactNode
}

const MDXLink = ({ children, href, ...rest }: Props) => {
  if (!href) return null

  const isExternal = !href.startsWith('#') && !href.startsWith('/')

  return (
    <>
      <Link
        /* FIXME */
        /* @ts-expect-error 型パズルに敗北...*/
        href={href}
        {...rest}
        className={styles.link}
        target={isExternal ? '_blank' : '_self'}
      >
        {children}
      </Link>
    </>
  )
}

export default MDXLink
