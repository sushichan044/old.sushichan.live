import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import BackButton from '@/components/button/backButton'
import styles from '@/components/error/error-dialog.module.scss'

const ErrorDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <FontAwesomeIcon
        className={styles.logo}
        icon={['fas', 'question']}
        size="4x"
      />
      <p>{children}</p>
      <BackButton />
    </>
  )
}

export default ErrorDialog
