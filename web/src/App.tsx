import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PublicRoute from './components/PublicRoute'
import ProtectRoute from './components/ProtectRoute'

const App = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
