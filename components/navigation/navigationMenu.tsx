'use client'
import * as NavMenu from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

import styles from '@/components/navigation/styles.module.scss'

type NavLinkProps = Omit<ComponentProps<typeof NavMenu.Link>, 'href'> & {
  href: ComponentProps<typeof Link>['href']
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, ...props }) => {
  const isActive = usePathname() === href
  return (
    <Link href={href} passHref>
      <NavMenu.Link active={isActive} asChild {...props} /> {children}
    </Link>
  )
}

const NavigationMenu = () => {
  return (
    <NavMenu.Root className={styles['menu-root']}>
      <NavMenu.List className={styles['menu-list']}>
        <NavMenu.Item>
          <NavLink href="/">
            <p>home</p>
          </NavLink>
        </NavMenu.Item>
        <NavMenu.Item>
          <NavLink href="/about">
            <p>About</p>
          </NavLink>
        </NavMenu.Item>
        <NavMenu.Item>
          <NavLink href="/blog">
            <p>Blog</p>
          </NavLink>
        </NavMenu.Item>
        <NavMenu.Indicator />
      </NavMenu.List>
    </NavMenu.Root>
  )
}

export default NavigationMenu
