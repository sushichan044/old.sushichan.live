'use client'
import * as NavMenu from '@radix-ui/react-navigation-menu'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

import Link from '@/components/base/link'
import styles from '@/components/ui/navigation/styles.module.scss'

type NavLinkProps = Omit<ComponentProps<typeof NavMenu.Link>, 'href'> & {
  href: ComponentProps<typeof Link>['href']
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, ...props }) => {
  const topPath = `/${usePathname().split('/')[1]}`
  const isActive = topPath === href

  return (
    <Link href={href} options={{ textDecoration: 'none' }} passHref>
      <NavMenu.Link
        active={isActive}
        asChild
        className={styles.indicator}
        {...props}
      >
        {children}
      </NavMenu.Link>
    </Link>
  )
}

const NavigationMenu = () => {
  return (
    <NavMenu.Root className={styles['menu-root']}>
      <NavMenu.List className={styles['menu-list']}>
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
      </NavMenu.List>
    </NavMenu.Root>
  )
}

export default NavigationMenu
