import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosClient from '../config/axiosClient';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('x-token');

      if (!token) {
        setIsLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
      };

      try {
        const { data } = await axiosClient('/auth/login', config);
        setAuth(data.user);
      } catch (error) {
        localStorage.removeItem('x-token');
        setAuth({});
      }

      setIsLoading(false);
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
