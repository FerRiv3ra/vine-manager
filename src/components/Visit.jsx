import moment from 'moment';
import React from 'react';
import useUsers from '../hooks/useUsers';

export const Visit = ({ visit }) => {
  const { deleteVisit } = useUsers();

  const handleDelete = () => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this visit? A deleted visit cannot be recovered.'
    );

    if (confirmDelete) {
      deleteVisit(visit._id);
    }
  };

  return (
    <div className="flex justify-between mt-2 border-t-2 pt-2">
      <p className="w-1/4 text-center">{visit.customerId}</p>
      <p className="w-1/4 text-center">{moment(visit.date).format('ll')}</p>
      <p className="w-1/4 text-center">£ {visit.amount}</p>
      <button
        onClick={handleDelete}
        className="w-1/4 border border-red-500 px-1 rounded-lg text-red-500 text-xs font-semibold uppercase flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        <p> Delete</p>
      </button>
    </div>
  );
};
