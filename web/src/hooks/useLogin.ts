import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../api/auth'

const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user)
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })
}

export default useLogin
