import Link from 'next/link'

import styles from '@/components/layout/header.module.scss'
import NavigationMenu from '@/components/navigation/navigationMenu'

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles['header-inside']}>
        <Link href="/">
          <p className={styles.title}>お寿司だいすきチャンネル</p>
        </Link>
        <NavigationMenu />
      </div>
    </header>
  )
}

export default Header
