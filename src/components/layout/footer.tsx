import Link from '@/components/base/link'
import styles from '@/components/layout/footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles['header-inside']}>
        <p>© 2023 sushi-chan</p>
        <Link href="/legal/privacy" options={{ textDecoration: 'none' }}>
          プライバシーポリシー
        </Link>
      </div>
    </footer>
  )
}

export default Footer
