import {useMutation} from '@tanstack/react-query'
import {loginUser} from '../../../entities/user/api/userApi'
import {useNavigate} from 'react-router-dom'

export const useLogin = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token)
      navigate('/')
    },
  })
}
