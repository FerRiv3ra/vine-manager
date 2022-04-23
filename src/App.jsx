import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EventsProvider>
          <UsersProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
              </Route>
              <Route path="/events" element={<ProtectedRoutes />}>
                <Route index element={<Events />} />
                <Route path="new-event" element={<NewEvent />} />
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
