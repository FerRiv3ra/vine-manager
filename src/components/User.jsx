import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUsers from '../hooks/useUsers';

const User = ({ user }) => {
  const [canVisit, setCanVisit] = useState(true);
  const [d, m, y] = user.lastVisit.split('/');

  const { addVisit, showAlert } = useUsers();

  useEffect(() => {
    const start =
      moment(`${y}-${m}-${d}`).dayOfYear() - moment(`${y}-${m}-${d}`).day();
    const week = moment().dayOfYear() - moment().day();

    if (start === week || user.blocked) {
      setCanVisit(false);
    }
  }, []);

  const handleClick = async () => {
    const amount = prompt('Amount of donation given?');
    const dataVisit = {
      customerId: user.customerId,
      amount: Number(amount) || 0,
      uid: user.uid,
    };

    const resp = await addVisit(dataVisit);

    if (resp.msg) {
      showAlert(resp.msg, true, 5000);
      setCanVisit(false);
      return;
    }

    if (resp.errors) {
      resp.errors.forEach((e) => {
        showAlert(e.msg);
      });
      setCanVisit(false);
      return;
    }

    showAlert(`Visit for user ${resp.visit.customerId} added`, false, 3000);

    setCanVisit(false);
  };

  return (
    <div className="border-b p-4 w-full columns-3">
      <div className="flex flex-col">
        <p className="flex-1">
          <span className="font-bold">Name:</span> {user.firstName}{' '}
          {user.lastName}
        </p>
        <p className="flex-1">
          <span className="font-bold">Phone number:</span>{' '}
          {user.phone ? user.phone : 'N/A'}
        </p>
      </div>
      <div>
        <div className="flex mt-1 flex-col">
          <button
            disabled={!canVisit}
            className={`${
              !canVisit
                ? 'bg-slate-400'
                : 'bg-green-600 hover:bg-green-700 transition-colors'
            } w-20 h-12 text-xs font-bold text-white uppercase rounded-md p-2`}
            onClick={handleClick}
          >
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            Add Visit
          </button>
        </div>
        <div className="flex mt-1 flex-col">
          <span className="bg-green-600 px-5 rounded-full text-white font-bold w-min self-end">
            {user.blocked ? 'Blocked' : user.customerId.toString()}
          </span>
          <Link
            to={`${user.uid}`}
            className="text-gray-600 hover:text-gray-800 text-sm uppercase font-bold self-end"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
