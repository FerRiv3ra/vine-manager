import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosClient from '../config/axiosClient';
import Logo from '../assets/logovc.png';

const Login = () => {
  // TODO: Agregar remember me
  const regexStrong = new RegExp(
    '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$'
  );

  const regexEmail = new RegExp(
    '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$'
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginOk, setLoginOk] = useState(false);
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginOk) {
      if (!token) {
        toast.error('Please paste the token');
        return;
      }

      navigate(`verify/${token}`);
    } else {
      if (!regexEmail.test(email)) {
        toast.error('Invalid email');
        return;
      }

      if (!regexStrong.test(password)) {
        toast.error('Invalid password');
        return;
      }

      try {
        const { data } = await axiosClient.post('/auth/login', {
          email,
          password,
        });

        if (data.ok) {
          setEmail('');
          setPassword('');
          toast.success(data.msg);
          setLoginOk(true);
        }
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/3 bg-[url('https://res.cloudinary.com/fercloudinary/image/upload/v1663870598/TheCommunityCupboard_rukx4s.jpg')]">
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <ToastContainer />
                <h2 className="text-4xl font-bold text-white">
                  The Vine Centre
                </h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  The Vine Centre has been in existence since 1987 and developed
                  from its humble beginnings as a soup kitchen to an
                  organisation which now provides a broad range of services to
                  the most disadvantaged members of our community (aged 18+).
                  These services are delivered Monday to Friday addressing the
                  immediate physical & mental health needs of our clients, as
                  well as their longer term needs.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <img
                  src={Logo}
                  alt="Logo The Vine Centre"
                  className="w-16 mx-auto"
                />
                <h2 className="text-4xl font-bold text-center text-gray-700">
                  The Vine Centre
                </h2>

                <p className="mt-3 text-gray-500">
                  Sign in to access your account
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={handleSubmit}>
                  {loginOk ? (
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
                          autoComplete="none"
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
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm text-gray-600"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@example.com"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>

                      <div className="mt-6">
                        <div className="flex justify-between mb-2">
                          <label
                            htmlFor="password"
                            className="text-sm text-gray-600"
                          >
                            Password
                          </label>
                          <Link
                            to="/forgot-password"
                            className="text-sm text-gray-400 focus:text-green-500 hover:text-green-500 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>

                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Your Password"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                      <div className="mt-6">
                        <button
                          type="submit"
                          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                  )}
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?{' '}
                  <Link
                    to="/signup"
                    className="text-green-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
