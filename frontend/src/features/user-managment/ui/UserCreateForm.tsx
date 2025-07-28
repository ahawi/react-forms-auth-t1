import {useEffect} from 'react'
import {Form, Input, Button, DatePicker, Select, Checkbox, Card} from 'antd/es'
import {useForm, Controller} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom'
import {userCreateSchema} from '../lib/validation'
import {useCreateUser} from '../../../entities/user/model/useUser'
import dayjs from 'dayjs';


const {Option} = Select

export const UserCreateForm = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      name: '',
      surName: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthDate: null,
      telephone: '',
      employment: undefined,
      userAgreement: false,
    },
  })

  const {mutate: createUser, isPending, isSuccess} = useCreateUser()

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess, navigate])

  const onSubmit = (data: any) => {
    const payload: {[key: string]: any} = {
      name: data.name,
      surName: data.surName,
      email: data.email,
      password: data.password,
    }

    if (data.birthDate) {
      payload.birthDate = dayjs(data.birthDate).toISOString()
    }
    if (data.telephone) {
      payload.telephone = data.telephone
    }

    if (data.employment) {
      payload.employment = data.employment
    }

    if (data.userAgreement !== undefined) {
      payload.userAgreement = data.userAgreement
    }

    createUser(payload)
  }

  return (
    <Card title='Create new user' style={{margin: '0 auto'}}>
      <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
        <Form.Item label='Name' validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
          <Controller name='name' control={control} render={({field}) => <Input {...field} />} />
        </Form.Item>
        <Form.Item label='Surname' validateStatus={errors.surName ? 'error' : ''} help={errors.surName?.message}>
          <Controller name='surName' control={control} render={({field}) => <Input {...field} />} />
        </Form.Item>
        <Form.Item label='Email' validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
          <Controller name='email' control={control} render={({field}) => <Input {...field} />} />
        </Form.Item>
        <Form.Item label='Password' validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
          <Controller name='password' control={control} render={({field}) => <Input.Password {...field} />} />
        </Form.Item>
        <Form.Item
          label='Confirm password'
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword?.message}
        >
          <Controller name='confirmPassword' control={control} render={({field}) => <Input.Password {...field} />} />
        </Form.Item>
        <Form.Item label='Birth date' validateStatus={errors.birthDate ? 'error' : ''} help={errors.birthDate?.message}>
          <Controller
            name='birthDate'
            control={control}
            render={({field}) => (
              <DatePicker
                {...field}
                value={typeof field.value === 'string' && field.value ? dayjs(field.value) : null}
                onChange={(_, dateString) => {
                  const valueToPass = typeof dateString === 'string' && dateString ? dateString : null
                  field.onChange(valueToPass)
                }}
                style={{width: '100%'}}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label='Phone number'
          validateStatus={errors.telephone ? 'error' : ''}
          help={errors.telephone?.message}
        >
          <Controller
            name='telephone'
            control={control}
            render={({field}) => <Input {...field} placeholder='89991231231' />}
          />
        </Form.Item>
        <Form.Item
          label='Employment'
          validateStatus={errors.employment ? 'error' : ''}
          help={errors.employment?.message}
        >
          <Controller
            name='employment'
            control={control}
            render={({field}) => (
              <Select {...field} placeholder='Employment'>
                <Option value='employed'>Employed</Option>
                <Option value='unemployed'>Unemployed</Option>
                <Option value='student'>Student</Option>
              </Select>
            )}
          />
        </Form.Item>
        <Form.Item validateStatus={errors.userAgreement ? 'error' : ''} help={errors.userAgreement?.message}>
          <Controller
            name='userAgreement'
            control={control}
            render={({field}) => (
              <Checkbox {...field} checked={field.value}>
                I agree with the user agreement
              </Checkbox>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isPending} block>
            Create user
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
