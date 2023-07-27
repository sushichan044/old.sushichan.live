import styles from '@/components/common/responsive-iframe.module.scss'

const ResponsiveIframe = (props: React.ComponentProps<'iframe'>) => {
  return (
    <div className={styles.root}>
      <iframe {...props} />
    </div>
  )
}

export default ResponsiveIframe
