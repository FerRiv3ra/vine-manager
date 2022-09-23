import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoutes from './layouts/ProtectedRoutes';
import Login from './pages/Login';
import Events from './pages/Events';
import NewEvent from './pages/NewEvent';
import NewUser from './pages/NewUser';
import Users from './pages/Users';
import { AuthProvider } from './context/AuthProvider';
import { EventsProvider } from './context/EventsProvider';
import { UsersProvider } from './context/UsersProvider';
import UserProfile from './pages/UserProfile';
import EditUser from './pages/EditUser';
import EditEvent from './pages/EditEvent';
import VerifyLogin from './pages/VerifyLogin';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import VerifyToken from './pages/VerifyToken';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EventsProvider>
          <UsersProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route
                  exact
                  path="forgot-password"
                  element={<ForgotPassword />}
                />
                <Route
                  path="forgot-password/:token"
                  element={<VerifyToken />}
                />
                <Route path="new-password/:token" element={<NewPassword />} />
                <Route path="verify/:token" element={<VerifyLogin />} />
              </Route>
              <Route path="/events" element={<ProtectedRoutes />}>
                <Route index element={<Events />} />
                <Route path="new-event" element={<NewEvent />} />
                <Route path="edit/:id" element={<EditEvent />} />
              </Route>
              <Route path="/users" element={<ProtectedRoutes />}>
                <Route index element={<Users />} />
                <Route path="new-user" element={<NewUser />} />
                <Route path=":id" element={<UserProfile />} />
                <Route path="edit/:id" element={<EditUser />} />
              </Route>
            </Routes>
          </UsersProvider>
        </EventsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
