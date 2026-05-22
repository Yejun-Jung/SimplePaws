import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import KakaoCallback from "../pages/auth/KakaoCallback";
import PostAll from "../pages/posts/PostAll";
import PostCreate from "../pages/posts/PostCreate";
import PostDetail from "../pages/posts/PostDetail";
import PostEdit from "../pages/posts/PostEdit";
import Profile from "../pages/profile/Profile";
import ProfileEdit from "../pages/profile/ProfileEdit";
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/oauth/callback/kakao", element: <KakaoCallback /> },
  { path: "/main", element: <PrivateRoute><PostAll /></PrivateRoute> },
  { path: "/posts/create", element: <PrivateRoute><PostCreate /></PrivateRoute> },
  { path: "/posts/:id", element: <PrivateRoute><PostDetail /></PrivateRoute> },
  { path: "/posts/edit/:id", element: <PrivateRoute><PostEdit /></PrivateRoute> },
  { path: "/profile", element: <PrivateRoute><Profile /></PrivateRoute> },
  { path: "/profile/edit", element: <PrivateRoute><ProfileEdit /></PrivateRoute> },
]);

export default router;