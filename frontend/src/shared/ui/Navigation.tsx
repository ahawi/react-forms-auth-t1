import {Layout, Menu, type MenuProps} from 'antd/es'
import styles from '../assets/styles/Navigation.module.css'
import React from 'react'
const {Sider} = Layout

interface NavigationProps {
  selectedKeys: string[]
  items: MenuProps['items']
}

export const Navigation = ({selectedKeys, items}: NavigationProps) => {
  return (
    <Sider width={200} className={styles.sider}>
      <Menu selectedKeys={selectedKeys} className={styles.sider__menu} items={items} />
    </Sider>
  )
}
