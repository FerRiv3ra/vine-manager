import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main className="w-full md:flex md:justify-center">
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
