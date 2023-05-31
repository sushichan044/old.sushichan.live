// import Image from 'next/image'
import Link from 'next/link'

import styles from '@/components/layout/header.module.scss'
import NavigationMenu from '@/components/navigation/navigationMenu'
// import LogoSvg from '@/public/logo.svg'

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles['header-inside']}>
        <Link className={styles.hero} href="/">
          {/* <Image alt="site logo" height={50} src={LogoSvg} width={50} /> */}
          <p className={styles.title}>お寿司だいすきチャンネル</p>
        </Link>

        <NavigationMenu />
      </div>
    </header>
  )
}

export default Header
