import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosClient from '../config/axiosClient';
import useAuth from '../hooks/useAuth';

const VerifyLogin = () => {
  const { token } = useParams();

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await axiosClient(`/auth/login/${token}`);

        localStorage.setItem('x-token', data.token);
        setAuth(data.user);
        navigate('/events');
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    };

    verifyToken();
  }, []);
  return (
    <div className="bg-red-600">
      <ToastContainer />
    </div>
  );
};

export default VerifyLogin;
