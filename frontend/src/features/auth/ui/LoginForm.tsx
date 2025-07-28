import {Form, Input, Button, Typography} from 'antd'
import {useForm, Controller} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'
import {useLogin} from '../lib/useLogin'


const {Item} = Form
const {Text} = Typography

const loginSchema = z.object({
  email: z.string().email('Incorrect email address').nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
})

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {email: '', password: ''},
  })
  const {mutate: login, isPending, isError, error} = useLogin()

  const onSubmit = (data: any) => {
    login(data)
  }
  return (
    <Form onFinish={handleSubmit(onSubmit)} layout='vertical'>
      <Item label='Email' validateStatus={errors.email ? 'error' : ''} help={errors.email?.message as string}>
        <Controller name='email' control={control} render={({field}) => <Input {...field} />} />
      </Item>
      <Item label='Password' validateStatus={errors.password ? 'error' : ''} help={errors.password?.message as string}>
        <Controller name='password' control={control} render={({field}) => <Input.Password {...field} />} />
      </Item>
      <Item>
        <Button type='primary' htmlType='submit' loading={isPending} block>
          Log in
        </Button>
      </Item>
      {isError && <Text type='danger'>{(error as Error).message}</Text>}
    </Form>
  )
}
