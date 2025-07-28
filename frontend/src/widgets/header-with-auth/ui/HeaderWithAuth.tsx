import {Button} from 'antd/es'
import {LogoutOutlined} from '@ant-design/icons/lib'
import {useNavigate} from 'react-router-dom'
import {useQueryClient} from '@tanstack/react-query'
import {Header} from '../../../shared/ui/Header'
import React from 'react'

export const HeaderWithAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    queryClient.clear()
    navigate('/login')
  }

  return (
    <Header>
      <Button type='primary' danger icon={<LogoutOutlined />} onClick={handleLogout}>
        Log out
      </Button>
    </Header>
  )
}
