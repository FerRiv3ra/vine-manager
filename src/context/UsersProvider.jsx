import { createContext, useEffect, useState } from 'react';
import axiosClient from '../config/axiosClient';

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const { data } = await axiosClient('/users?limit=0', config);
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const getUser = async (id) => {
    setIsLoading(true);
    const data = users.filter((user) => user.uid === id);
    setUser(data[0]);
    setIsLoading(false);
  };

  const submitUser = async (user) => {
    const { confirmPass, ...body } = user;
    const [y, m, d] = body.dob.split('-');
    body.dob = `${d}/${m}/${y}`;

    if (body.role.includes('USER')) {
      body.password = 'Abc123';
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axiosClient.post('/users', body, config);

      setUsers([data, ...users]);

      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <UsersContext.Provider
      value={{ users, submitUser, getUser, user, isLoading }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };

export default UsersContext;
