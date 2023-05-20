import styles from '@/components/layout/footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles['header-inside']}>
        <p>© 2023 sushi-chan</p>
      </div>
    </footer>
  )
}

export default Footer
