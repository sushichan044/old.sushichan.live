import styles from '@/components/layout/header.module.scss'
import NavigationMenu from '@/components/navigation/navigationMenu'

const Header = () => {
  return (
    <header className={styles.container}>
      <p>Header</p>
      <NavigationMenu />
    </header>
  )
}

export default Header
