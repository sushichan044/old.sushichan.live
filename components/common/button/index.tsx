import styles from '@/components/common/button/button.module.scss'

export type ButtonProps = {
  children: React.ReactNode
  style?: React.CSSProperties
  onClick?: React.ComponentProps<'button'>['onClick'] | undefined
}

const Button = ({ children, style, onClick }: ButtonProps) => {
  return (
    <button className={styles.root} onClick={onClick} style={style}>
      {children}
    </button>
  )
}

export default Button
