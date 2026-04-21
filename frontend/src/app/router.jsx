import { createBrowserRouter } from 'react-router-dom'
import Landing from '../pages/landing/Landing'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import PostAll from '../pages/posts/PostAll'
import PostCreate from '../pages/posts/PostCreate'
import PostDetail from '../pages/posts/PostDetail'
import PostEdit from '../pages/posts/PostEdit'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/main',
    element: <PostAll />,
  },
  {
    path: '/posts/create',
    element: <PostCreate />,
  },
  {
    path: '/posts/:id',
    element: <PostDetail />,
  },
  {
    path: '/posts/edit/:id',
    element: <PostEdit />,
  },
])

export default router