import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import Root, { loader as rootLoader } from './pages/Root';
import Profile, { loader as profileLoader } from './pages/Profile';
import Login, { loader as loginLoader, action as loginAction } from './pages/Login';
import Signup, { action as signupAction } from './pages/Signup';
import { action as logoutAction } from './pages/Logout';
import NotFound from './pages/NotFound';
import Error from './components/Error';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Root />} loader={rootLoader} errorElement={<Error />}>
        <Route errorElement={<Error />}>
          <Route index element={<Profile />} loader={profileLoader} />
          <Route path='login' element={<Login />} loader={loginLoader} action={loginAction} />
          <Route path='signup' element={<Signup />} action={signupAction} />
          <Route path='logout' action={logoutAction} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
