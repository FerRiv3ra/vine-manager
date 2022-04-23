import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';

const ProtectedRoutes = () => {
  const { auth, isLoading } = useAuth();

  if (isLoading) return 'Loading...';
  return (
    <>
      {auth.uid ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <main className="p-10 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedRoutes;
