import styles from '@/components/common/button.module.scss'

type ButtonProps = {
  children: React.ReactNode
  style?: React.CSSProperties
  onClick?: () => void
}

const Button = ({ children, style, onClick }: ButtonProps) => {
  return (
    <button className={styles.root} onClick={onClick} style={style}>
      {children}
    </button>
  )
}

export default Button
