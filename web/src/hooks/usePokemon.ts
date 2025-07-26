import { useQuery } from '@tanstack/react-query'
import { fetchAllPokemon } from '../api/pokemon'

export const useAllPokemon = () => {
  return useQuery({
    queryKey: ['pokemon', 'all'],
    queryFn: fetchAllPokemon,
    staleTime: Infinity,
  })
}
