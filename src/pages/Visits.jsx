import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visit } from '../components/Visit';
import useUsers from '../hooks/useUsers';

export const Visits = () => {
  const [loading, setLoading] = useState(true);

  const { getVisits, visits } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const resp = await getVisits();

      setLoading(false);
      if (!resp.ok) {
        navigate('/dashboard');
      }
    };

    getData();
  }, []);

  return (
    <div className="h-screen bg-white p-10">
      {loading ? (
        <div className="flex justify-center items-center">
          <img
            className="h-16 w-16"
            src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
            alt="spinner"
          />
        </div>
      ) : (
        <div>
          <div className="flex">
            <p className="w-1/4 text-center font-bold">Customer ID</p>
            <p className="w-1/4 text-center font-bold">Date</p>
            <p className="w-1/4 text-center font-bold">Donation amount</p>
            <p className="w-1/4"></p>
          </div>
          {visits.map((visit) => (
            <Visit visit={visit} key={visit._id} />
          ))}
        </div>
      )}
    </div>
  );
};
