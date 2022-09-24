import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { QRCode } from 'react-qrcode-logo';
import { ToastContainer } from 'react-toastify';

import useUsers from '../hooks/useUsers';
import LogoImg from '../assets/logovc.png';

const UserProfile = () => {
  const { id } = useParams();
  const { getUser, user, isLoading, deleteUser, showAlert, unblockUser } =
    useUsers();
  useEffect(() => {
    getUser(id);
  }, []);

  const navigate = useNavigate();

  const handleDelete = async () => {
    const resp = confirm('Are you sure you want to delete this user?');

    if (!resp) return;

    const data = await deleteUser(id);

    if (data.msg) {
      showAlert(data.msg, true, 5000);
      return;
    }

    if (data.errors) {
      data.errors.forEach((e) => {
        showAlert(e.msg);
      });
      return;
    }

    showAlert(`User ${user.customerId} deleted`, false, 3000);

    setTimeout(() => {
      navigate('dashboard/users');
    }, 3500);
  };

  const handleUnblock = async () => {
    const resp = confirm('Are you sure you want to unblock this user?');

    if (!resp) return;

    const data = await unblockUser(id);

    if (data.errors) {
      data.errors.forEach((e) => {
        showAlert(e.msg);
      });
      return;
    }

    showAlert(`User ${user.customerId} unblocked`, false, 3000);
  };

  return isLoading ? (
    <button type="button" class="bg-green-600 ..." disabled>
      <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      Processing...
    </button>
  ) : (
    <>
      <ToastContainer />
      <div className=" float-left mr-2">
        <QRCode value={`${user.uid}`} size={170} logoImage={LogoImg} />
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <h1 className="font-black text-3xl h-min w-auto">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-lg ml-10 bg-green-600 h-min py-2 px-4 rounded-full text-white font-bold">
            {user.blocked ? 'Blocked' : `# ${user.customerId}`}
          </p>
        </div>
      </div>

      <div>
        <p className="text-lg w-2/3">
          <span className="font-black">Number in household:</span>{' '}
          {user.child
            ? `${user.noHousehold} (${user.childCant} ${
                user.childCant === 1 ? 'child' : 'children'
              })`
            : user.noHousehold}
        </p>
        <p className="text-lg w-2/3">
          <span className="font-black">Phone:</span> {user.phone}
        </p>
        <p className="text-lg w-2/3">
          <span className="font-black">Postcode:</span> {user.postcode}
        </p>

        <p className="text-lg w-2/3">
          <span className="font-black">Housing provider:</span>{' '}
          {user.housingProvider}
        </p>
        <p className="text-lg w-auto text-center mt-4">
          This user have{' '}
          <span className="text-green-600 font-bold">
            {user.blocked ? 0 : user.visits === 0 ? 4 : 4 - (user.visits % 4)}
          </span>{' '}
          visits left
        </p>
      </div>
      <p className={`text-lg text-center mt-6 font-semibold uppercase w-full`}>
        Actions
      </p>
      <div className="flex justify-around py-5 mt-1 rounded-xl bg-green-100">
        <div className="gap-2 mt-2 text-gray-500 hover:text-yellow-600 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 m-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <Link
            to={`/dashboard/users/edit/${user.uid}`}
            className="uppercase font-bold mx-3"
          >
            Edit
          </Link>
        </div>
        <div className="gap-2 mt-2 text-gray-500 hover:text-green-600 cursor-pointer">
          {user.blocked && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 m-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
              <button
                type="button"
                className="uppercase font-bold"
                onClick={handleUnblock}
              >
                Unblock
              </button>
            </>
          )}
        </div>
        <div className="gap-2 mt-2 text-gray-500 hover:text-red-600 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 m-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <button
            type="button"
            className="uppercase font-bold"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
