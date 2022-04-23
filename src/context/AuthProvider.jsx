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
