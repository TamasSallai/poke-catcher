import Pokedex from '../components/ui/Pokedex'
import useLogout from '../hooks/useLogout'

const Home = () => {
  const mutation = useLogout()
  return (
    <main className="max-w-4xl mx-auto p-4">
      <button
        className="button--primary | mb-4"
        onClick={() => mutation.mutate()}
      >
        Logout
      </button>

      <Pokedex />
    </main>
  )
}

export default Home
