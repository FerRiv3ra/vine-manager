import { createContext, useEffect, useState } from 'react';
import axiosClient from '../config/axiosClient';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [search, setSearch] = useState('');
  const [dataReport, setDataReport] = useState({});
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
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = { blocked: false };

      const { data } = await axiosClient.put(`/users/${id}`, body, config);

      setUsers(
        users.map((user) => {
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

    const date = moment(dob, 'YYYY-MM-DD').format('DD/MM/YYYY');

    body.dob = date;

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
        users.map((user) => {
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
    const { dob, ...body } = user;
    const date = moment(dob, 'YYYY-MM-DD').format('DD/MM/YYYY');

    body.dob = date;

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

      const { data } = await axiosClient.post(`/visits`, dataVisit, config);

      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const getDataReport = async (startDate, finalDate) => {
    try {
      const { data } = await axiosClient('/visits', {
        params: {
          startDate,
          finalDate,
        },
      });

      const users = data.usersArr.map((user) => {
        const amount = data.visits.reduce((total, visit) => {
          if (visit.customerId === user.customerId) {
            total += visit.amount;
          }

          return total;
        }, 0);

        user.amount = amount;

        return user;
      });

      setDataReport(users);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        msg: error.response.data.msg,
      };
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
        getDataReport,
        dataReport,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };

export default UsersContext;
