import { createContext, useEffect, useState } from 'react';
import axiosClient from '../config/axiosClient';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [search, setSearch] = useState('');
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

  const showAlert = (msg = '', error = true, autoClose = 5000) => {
    if (error) {
      toast.error(msg);
    } else {
      toast.success(msg, {
        autoClose,
      });
    }
  };

  const getUser = async (id) => {
    setIsLoading(true);
    const data = users.filter((user) => user.uid === id);
    setUser(data[0]);
    setIsLoading(false);
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('x-token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
      };
      const { data } = await axiosClient.delete(`/users/${id}`, config);
      setUsers(users.filter((user) => user.uid !== id));
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const unblockUser = async (id) => {
    const [userE] = users.filter((user) => user.uid === id);
    let toiletries = 3;
    if (userE) {
      if (userE.no_household - userE.child_cant > 1) {
        toiletries = 6;
      }
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = { blocked: false, role: 'USER_ROLE', toiletries };

      const { data } = await axiosClient.put(
        `/users/${id}`,
        JSON.stringify(body),
        config
      );

      setUsers(
        users.filter((user) => {
          if (user.uid === id) {
            return data;
          }
          return user;
        })
      );

      setUser(data);
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const editUser = async (userE) => {
    const { uid, confirmPass, password, ...body } = userE;
    if (password !== '') {
      body.password = password;
    }
    const [y, m, d] = body.dob.split('-');
    body.dob = `${d}/${m}/${y}`;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axiosClient.put(
        `/users/${uid}`,
        JSON.stringify(body),
        config
      );

      setUsers(
        users.filter((user) => {
          if (user.uid === uid) {
            return data;
          }
          return user;
        })
      );

      setUser(data);
      return data;
    } catch (error) {
      return error.response.data;
    }
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

  const addVisit = async (dataVisit) => {
    const token = localStorage.getItem('x-token');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
      };

      const { data } = await axiosClient.post(
        `/deliveries`,
        JSON.stringify(dataVisit),
        config
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        submitUser,
        getUser,
        user,
        isLoading,
        deleteUser,
        showAlert,
        unblockUser,
        editUser,
        search,
        setSearch,
        addVisit,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };

export default UsersContext;
