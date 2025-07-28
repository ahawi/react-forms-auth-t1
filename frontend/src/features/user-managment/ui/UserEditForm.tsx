import {useEffect} from 'react'
import {Form, Input, Button, DatePicker, Select, Checkbox, Card, Spin} from 'antd/es'
import {useForm, Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate, useParams} from 'react-router-dom'
import {userEditSchema, type UserEditFormInputs} from '../lib/validation'
import {useUser, useUpdateUser} from '../../../entities/user/model/useUser'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import React from 'react'

dayjs.locale('ru')

const {Item} = Form
const {Option} = Select

export const UserEditForm = () => {
  const {id} = useParams<{id: string}>()
  const navigate = useNavigate()

  const {data: userData, isPending: isUserLoading} = useUser(id!)
  const {mutate: updateUser, isPending: isUpdating} = useUpdateUser()

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<UserEditFormInputs>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: '',
      surName: '',
      birthDate: null,
      telephone: '',
      employment: undefined,
      userAgreement: false,
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || '',
        surName: userData.surName || '',
        birthDate:
          userData.birthDate && typeof userData.birthDate === 'string' && dayjs(userData.birthDate).isValid()
            ? userData.birthDate
            : null,
        telephone: userData.telephone || '',
        employment: userData.employment || undefined,
        userAgreement: userData.userAgreement || false,
        password: '',
        confirmPassword: '',
      })
    }
  }, [userData, reset])

  const onSubmit = (data: UserEditFormInputs) => {
    const payload = {...data} as Partial<UserEditFormInputs>

    delete payload.confirmPassword

    if (payload.birthDate) {
      payload.birthDate = dayjs(payload.birthDate).toISOString() as any
    } else {
      payload.birthDate = null
    }

    if (!payload.password || payload.password === '') {
      delete payload.password
    }

    updateUser(
      {id: id!, userData: payload},
      {
        onSuccess: (_) => {
          navigate('/')
        },
      },
    )
  }

  return (
    <Spin spinning={isUserLoading || isUpdating} size='large' style={{marginTop: '50px'}}>
      <Card title={`Update user: ${userData?.email || ''}`} style={{margin: '0 auto'}}>
        <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
          <Item label='ID'>
            <Input value={id} disabled />
          </Item>
          <Item label='Email'>
            <Input value={userData?.email} disabled />
          </Item>

          <Item label='Name' validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
            <Controller name='name' control={control} render={({field}) => <Input {...field} />} />
          </Item>
          <Item label='Surname' validateStatus={errors.surName ? 'error' : ''} help={errors.surName?.message}>
            <Controller name='surName' control={control} render={({field}) => <Input {...field} />} />
          </Item>

          <Item label='Password' validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
            <Controller
              name='password'
              control={control}
              render={({field}) => (
                <Input.Password
                  {...field}
                  value={field.value || ''}
                  placeholder='Leave it empty so as not to change it'
                />
              )}
            />
          </Item>
          <Item
            label='Confirm password'
            validateStatus={errors.confirmPassword ? 'error' : ''}
            help={errors.confirmPassword?.message}
          >
            <Controller
              name='confirmPassword'
              control={control}
              render={({field}) => <Input.Password {...field} value={field.value || ''} />}
            />
          </Item>

          <Item label='Birth date' validateStatus={errors.birthDate ? 'error' : ''} help={errors.birthDate?.message}>
            <Controller
              name='birthDate'
              control={control}
              render={({field}) => (
                <DatePicker
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => {
                    field.onChange(date)
                  }}
                  style={{width: '100%'}}
                />
              )}
            />
          </Item>

          <Item label='Phone number' validateStatus={errors.telephone ? 'error' : ''} help={errors.telephone?.message}>
            <Controller name='telephone' control={control} render={({field}) => <Input {...field} />} />
          </Item>
          <Item label='Employment' validateStatus={errors.employment ? 'error' : ''} help={errors.employment?.message}>
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
          </Item>
          <Item validateStatus={errors.userAgreement ? 'error' : ''} help={errors.userAgreement?.message}>
            <Controller
              name='userAgreement'
              control={control}
              render={({field}) => (
                <Checkbox {...field} checked={field.value}>
                  I agree with the user agreement
                </Checkbox>
              )}
            />
          </Item>

          <Item>
            <Button type='primary' htmlType='submit' loading={isUpdating} block>
              Update user
            </Button>
          </Item>
        </Form>
      </Card>
    </Spin>
  )
}
