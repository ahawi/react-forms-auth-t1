import {Layout} from 'antd/es'
import React from 'react'
import styles from '../assets/styles/Header.module.css'

const {Header: AntdHeader} = Layout

interface HeaderProps {
  children?: React.ReactNode
}

export const Header = ({children}: HeaderProps) => {
  return (
    <AntdHeader className={styles.header}>
      <h1 className={styles.header__title}>User Management</h1>
      {children}
    </AntdHeader>
  )
}
