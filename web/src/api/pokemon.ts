const BASE_URL = 'https://pokeapi.co/api/v2'

export interface PokemonType {
  name: string
  url: string
}

export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: Array<{
    type: {
      name: string
    }
  }>
  abilities: Array<{
    ability: {
      name: string
    }
    is_hidden: boolean
  }>
}

export const fetchAllPokemon = async (): Promise<PokemonListItem[]> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=100`)
  const data = await response.json()
  return data.results
}
