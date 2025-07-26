import { logout } from '../api/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error('Logout failed:', error)
    },
  })
}

export default useLogout
