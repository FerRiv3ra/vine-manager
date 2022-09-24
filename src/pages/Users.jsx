import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import User from '../components/User';
import useUsers from '../hooks/useUsers';

const Users = () => {
  const [usersList, setusersList] = useState([]);
  const { users, search, setSearch } = useUsers();
  const regex = /[0-9]/g;

  useEffect(() => {
    setSearch('');
    setusersList(users);
  }, []);

  let usersArr = [];
  if (regex.test(search)) {
    usersArr = usersList.filter((us) =>
      us.customerId.toString().includes(search)
    );
  } else {
    usersArr = usersList.filter((us) =>
      us.firstName
        .concat([' ', us.lastName])
        .toUpperCase()
        .includes(search.toUpperCase())
    );
  }

  return (
    <>
      <ToastContainer />
      <h2 className="text-4xl font-black">Users</h2>

      <div className="bg-white shadow mt-10 rounded-lg">
        {usersArr.length ? (
          usersArr.map((user) => <User key={user.uid} user={user} />)
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            Nothing to show
          </p>
        )}
      </div>
    </>
  );
};

export default Users;
