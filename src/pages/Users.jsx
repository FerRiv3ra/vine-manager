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
    setusersList(users.filter((user) => user.role === 'USER_ROLE'));
  }, []);

  const handleList = ({ target }) => {
    let list;
    if (target.value === 'ADMIN_ROLE') {
      list = users.filter((user) => user.role === 'ADMIN_ROLE');
    } else {
      list = users.filter((user) => user.role === 'USER_ROLE');
    }

    setusersList(list);
  };

  let usersArr = [];
  if (regex.test(search)) {
    usersArr = usersList.filter((us) =>
      us.customer_id.toString().includes(search)
    );
  } else {
    usersArr = usersList.filter((us) =>
      us.name.toUpperCase().includes(search.toUpperCase())
    );
  }

  return (
    <>
      <ToastContainer />
      <h1 className="text-4xl font-black">Users</h1>
      <h3 className="text-2xl font-bold text-center">View</h3>

      <form>
        <div className="flex justify-evenly">
          <div>
            <input
              type="radio"
              id="user"
              name="role"
              value="USER_ROLE"
              defaultChecked={true}
              onClick={handleList}
              className="checked:accent-green-600"
            />
            <label
              htmlFor="user"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              {' '}
              CUSTOMERS
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="admin"
              name="role"
              value="ADMIN_ROLE"
              onClick={handleList}
              className="checked:accent-green-600"
            />
            <label
              htmlFor="admin"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              {' '}
              ADMINS
            </label>
          </div>
        </div>
      </form>

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
