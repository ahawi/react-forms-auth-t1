import {Card} from 'antd/es'
import {LoginForm} from '../../features/auth/ui/LoginForm'
import styles from '../assets/styles/LoginPage/index.module.css'


const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <Card title='Log in' className={styles.loginPage__title}>
        <LoginForm />
      </Card>
    </div>
  )
}

export default LoginPage
