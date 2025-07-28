import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import {fetchUsers, createUser, fetchUserById, updateUser, deleteUser} from '../api/userApi'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']})
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({id, userData}: {id: string; userData: any}) => updateUser(id, userData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ['users']})
      queryClient.invalidateQueries({queryKey: ['user', variables.id]})
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']})
    },
  })
}
