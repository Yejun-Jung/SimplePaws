import { createBrowserRouter } from 'react-router-dom'
import Landing from '../pages/landing/Landing'
import Login from '../pages/auth/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router