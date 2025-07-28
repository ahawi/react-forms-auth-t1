import {BrowserRouter as Router, Routes, Route, Outlet, Navigate} from 'react-router-dom'
import {Layout} from 'antd/es'
import type {JSX} from 'react'
import HomePage from '../pages/HomePage'
import UserCreatePage from '../pages/UserCreatePage'
import UserEditPage from '../pages/UserEditPage'
import LoginPage from '../pages/LoginPage'
import {HeaderWithAuth} from '../widgets/header-with-auth/ui/HeaderWithAuth'
import {SidebarNavigation} from '../widgets/sidebar-navigation/ui/SidebarNavigation'
import styles from '../app/assets/App.module.css'
import React from 'react'

const {Content} = Layout

const AppLayout = () => {
  return (
    <Layout className={styles.layout}>
      {!LoginPage && <HeaderWithAuth />}
      <HeaderWithAuth />
      <Layout>
        <div className={styles.layout__inner}>
          <SidebarNavigation />
          {!LoginPage && <SidebarNavigation />}
          <Content className={styles.layout__content}>
            <Outlet />
          </Content>
        </div>
      </Layout>
    </Layout>
  )
}

const App = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null
  }

  const ProtectedRoute = ({children}: {children: JSX.Element}) => {
    if (!isAuthenticated()) {
      return <Navigate to='/login' replace />
    }
    return children
  }

  const AuthRoute = ({children}: {children: JSX.Element}) => {
    if (isAuthenticated()) {
      return <Navigate to='/' replace />
    }
    return children
  }

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path='/' element={<HomePage />} />
          <Route path='/user/create' element={<UserCreatePage />} />
          <Route path='/user/edit/:id' element={<UserEditPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
