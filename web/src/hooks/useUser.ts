import { useQuery } from '@tanstack/react-query'
import { me } from '../api/auth'

const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: me,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}

export default useUser
