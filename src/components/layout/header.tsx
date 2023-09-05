// import Image from 'next/image'
import Link from '@/components/common/link'
import styles from '@/components/layout/header.module.scss'
import NavigationMenu from '@/components/navigation/navigationMenu'
// import LogoSvg from '@/public/logo.svg'

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles['header-inside']}>
        <Link
          className={styles.hero}
          href="/"
          options={{ textDecoration: 'none' }}
        >
          {/* <Image alt="site logo" height={50} src={LogoSvg} width={50} /> */}
          <p className={styles.title}>sushi-chan.live</p>
        </Link>
        <NavigationMenu />
      </div>
    </header>
  )
}

export default Header