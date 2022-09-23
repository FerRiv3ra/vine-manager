import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosClient from '../config/axiosClient';
import Logo from '../assets/logovc.png';

const VerifyToken = () => {
  const [loading, setLoading] = useState(true);

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axiosClient(`/admins/forgot-password/${token}`);

        navigate(`/new-password/${token}`);
      } catch (error) {
        toast.error(error.response.data.msg);
      }

      setLoading(false);
    };

    verifyToken();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <p className="text-center">Loading...</p>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col bg-white h-screen">
          <ToastContainer />
          <img src={Logo} alt="Logo the vine centre" className="w-72" />
          <p className="p-8 font-medium text-lg uppercase">Invalid token</p>
          <Link
            to="/"
            className="px-5 py-2 bg-green-500 rounded-md text-white font-semibold uppercase"
          >
            Go home
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyToken;
