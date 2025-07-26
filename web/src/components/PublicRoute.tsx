import { Navigate, Outlet, useLocation } from 'react-router'
import useUser from '../hooks/useUser'

const PublicRoute = () => {
  const location = useLocation()

  const { data: user, isLoading, isError } = useUser()

  if (isLoading) {
    return <div>...loading</div>
  }

  if (!isError || user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default PublicRoute
