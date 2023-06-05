import React from 'react'
import { GiSushis } from 'react-icons/gi'

import BackButton from '@/components/button/backButton'
import styles from '@/components/error/error-dialog.module.scss'

const ErrorDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GiSushis className={styles.logo} />
      <p>{children}</p>
      <BackButton />
    </>
  )
}

export default ErrorDialog
