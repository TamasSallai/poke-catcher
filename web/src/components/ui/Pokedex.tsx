import { useAllPokemon } from '../../hooks/usePokemon'

const Pokedex = () => {
  const { data, isLoading } = useAllPokemon()

  return (
    <div className="grid grid-cols-4">
      {data?.map((pokemon) => (
        <div className="p-2" key={pokemon.name}>
          {pokemon.name}
        </div>
      ))}
    </div>
  )
}

export default Pokedex
