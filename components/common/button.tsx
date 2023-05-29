import styles from '@/components/common/button.module.scss'

export type ButtonProps = {
  children: React.ReactNode
  style?: React.CSSProperties
  onClick?: React.ComponentProps<'button'>['onClick'] | undefined
}

const Button = ({ children, style, onClick }: ButtonProps) => {
  return (
    <button className={styles.root} onClick={onClick} style={style}>
      <span className={styles.label}>{children}</span>
    </button>
  )
}

export default Button
