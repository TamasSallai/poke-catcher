import { useMutation, useQueryClient } from '@tanstack/react-query'
import { register } from '../api/auth'

const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user)
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })
}

export default useRegister
