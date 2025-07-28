import {type MenuProps} from 'antd'
import {PlusOutlined, HomeOutlined} from '@ant-design/icons'
import {useNavigate, useLocation} from 'react-router-dom'
import {Navigation} from '../../../shared/ui/Navigation'
import React from 'react'

export const SidebarNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Homepage',
      onClick: () => navigate('/'),
    },
    {
      key: '/user/create',
      icon: <PlusOutlined />,
      label: 'Create user',
      onClick: () => navigate('/user/create'),
    },
  ]

  return <Navigation selectedKeys={[location.pathname]} items={menuItems} />
}
