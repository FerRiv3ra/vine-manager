import { Link } from 'react-router-dom';

const User = ({ user }) => {
  return (
    <div className="border-b p-4 w-full">
      <div className="flex">
        <p className="flex-1">
          <span className="font-bold">Name:</span> {user.name}
        </p>
        <span className="bg-green-600 px-5  rounded-full text-white font-bold">
          {user.role === 'ADMIN_ROLE'
            ? 'ADMIN'
            : user.blocked
            ? 'Blocked'
            : user.customer_id}
        </span>
      </div>
      <div className="flex mt-1">
        <p className="flex-1">
          <span className="font-bold">
            {user.role === 'USER_ROLE' ? 'Phone number:' : 'Email:'}
          </span>{' '}
          {user.role === 'ADMIN_ROLE'
            ? user.email
            : user.phone
            ? user.phone
            : 'N/A'}
        </p>
        <Link
          to={`${user.uid}`}
          className="text-gray-600 hover:text-gray-800 text-sm uppercase font-bold"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default User;
