import { Navigate, Outlet, useLocation } from 'react-router'
import useUser from '../hooks/useUser'

const ProtectRoute = () => {
  const location = useLocation()

  const { data: user, isLoading, isError } = useUser()

  if (isLoading) {
    return <div>...loading</div>
  }

  if (isError || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectRoute
