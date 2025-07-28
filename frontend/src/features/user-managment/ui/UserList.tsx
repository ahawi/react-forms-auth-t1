import {Table, Button, Flex, Spin, Card} from 'antd/es'
import {useUsers, useDeleteUser} from '../../../entities/user/model/useUser'
import {useNavigate} from 'react-router-dom'
import styles from '../assets/styles/UserList.module.css'
import type {ColumnsType} from 'antd/es/table'


interface User {
  id: string
  email: string
  name: string
  surName: string
}

export const UserList = () => {
  const navigate = useNavigate()
  const {data: users, isPending} = useUsers()
  const {mutate: deleteUser, isPending: isDeleting} = useDeleteUser()

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id)
    }
  }

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surName',
      key: 'surName',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => {
        const isTargetRowAdmin = record.id === '1'

        return (
          <Flex gap='large' align='center' className={styles.userList__actions}>
            <Button onClick={() => navigate(`/user/edit/${record.id}`)} disabled={isTargetRowAdmin} title={'Edit user'}>
              Edit
            </Button>
            <Button
              danger
              onClick={() => handleDelete(record.id)}
              disabled={isTargetRowAdmin}
              loading={isDeleting}
              title={'Delete user'}
            >
              Delete
            </Button>
          </Flex>
        )
      },
    },
  ]

  const getRowClassName = (record: any) => {
    const isTargetRowAdmin = record.id === '1'
    return isTargetRowAdmin ? 'admin-row' : ''
  }

  if (isPending) return <Spin spinning size='large' style={{margin: 'auto'}} />

  return (
    <Card title='User list' className={styles.userList}>
      <Button type='primary' onClick={() => navigate('/user/create')} className={styles.userList__button}>
        Create user
      </Button>

      <Table
        scroll={{x: true}}
        columns={columns}
        dataSource={users}
        rowKey='id'
        rowClassName={getRowClassName}
        className={styles.userList__table}
      />
    </Card>
  )
}
