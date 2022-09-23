import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosClient from '../config/axiosClient';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [isEmailOk, setIsEmailOk] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regexEmail = new RegExp(
      '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$'
    );

    if (isEmailOk) {
      if (!token) {
        toast.error('Please paste the token');
        return;
      }

      navigate(`/forgot-password/${token}`);
    } else {
      if (!regexEmail.test(email)) {
        toast.error('Invalid email');
        return;
      }

      try {
        const { data } = await axiosClient.post('/admins/forgot-password', {
          email,
        });

        setEmail('');

        toast.success(data.msg, { autoClose: 3500 });
        setIsEmailOk(true);
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div className="bg-gray-200">
      <ToastContainer />
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full xl:w-3/4 lg:w-full flex">
            <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg bg-[url(https://res.cloudinary.com/fercloudinary/image/upload/v1663947164/CVCCC_bhjeuy.jpg)]"></div>
            <div className="w-full lg:w-1/2 bg-white px-5 pt-14 h-screen rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                <p className="mb-4 text-sm text-gray-700">
                  We get it, stuff happens. Just enter your email address below
                  and we'll send you a link to reset your password!
                </p>
              </div>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSubmit}
              >
                {isEmailOk ? (
                  <div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email"
                      >
                        Token
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="token"
                        type="text"
                        autoComplete={false}
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Paste the token"
                      />
                    </div>
                    <div className="mb-6 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Verify token
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email Address..."
                      />
                    </div>
                    <div className="mb-6 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                )}
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-slate-600 align-baseline hover:text-green-500"
                    to="/signup"
                  >
                    Create an Account!
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-slate-600 align-baseline hover:text-green-500"
                    to="/"
                  >
                    Already have an account? Login!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
