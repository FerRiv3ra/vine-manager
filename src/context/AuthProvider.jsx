import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../config/axiosClient';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('x-token');
      const autoLogin = localStorage.getItem('rememberMe');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
      };

      await axiosClient('/visits/0', config);

      if (!autoLogin) {
        localStorage.removeItem('x-token');
      } else {
        if (!token) {
          setIsLoading(false);
          return;
        }

        try {
          const { data } = await axiosClient('/auth/login', config);
          setAuth(data.user);

          navigate('/dashboard');
        } catch (error) {
          localStorage.removeItem('x-token');
          setAuth({});
        }

        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
