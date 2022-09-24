import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex flex-1 justify-center">
      <div className="flex  items-center justify-center px-4">
        <div className="max-w-xs overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl">
          <img
            src="https://res.cloudinary.com/fercloudinary/image/upload/v1664032238/1416_d6ts0d.png"
            alt="plant"
            className="h-auto w-full"
          />
          <div className="p-5">
            <p className="text-medium  text-gray-700">
              Manage events for Culture Café.
            </p>
            <p className="mb-5 text-medium  text-gray-700">
              (Not avalible in this moment)
            </p>
            <button className="w-full rounded-md bg-green-600  py-2 text-green-100 hover:bg-green-500 hover:shadow-md duration-75">
              See More
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-4">
        <div className="max-w-xs overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl">
          <img
            src="https://res.cloudinary.com/fercloudinary/image/upload/v1664032238/14165_kqwbin.png"
            alt="plant"
            className="h-auto w-full"
          />
          <div className="p-5">
            <p className="text-medium mb-5 text-gray-700">
              Manage users for Community Cupboard.
            </p>
            <Link
              to="/dashboard/users"
              className="w-full block text-center rounded-md bg-green-600  py-2 text-green-100 hover:bg-green-500 hover:shadow-md duration-75"
            >
              See More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
