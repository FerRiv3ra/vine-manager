import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ShowAlert from '../components/ShowAlert';
import axiosClient from '../config/axiosClient';

const SignUp = () => {
  const regexStrong = new RegExp(
    '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$'
  );

  const regexEmail = new RegExp(
    '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$'
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [length8, setLength8] = useState(false);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [isPassOk, setIsPassOk] = useState(true);

  const navigate = useNavigate();

  const handlePassword = (e) => {
    const hasMayus = new RegExp('^(?=.*[A-Z])');
    const hasMinus = new RegExp('^(?=.*[a-z])');
    const hasNum = new RegExp('^(?=.*[0-9])');
    const hasSpe = new RegExp('^(?=.*[!@#$&*])');

    setPassword(e.target.value);

    setLength8(e.target.value.length >= 8);
    setHasUpper(hasMayus.test(e.target.value));
    setHasLower(hasMinus.test(e.target.value));
    setHasNumber(hasNum.test(e.target.value));
    setHasSpecial(hasSpe.test(e.target.value));
    setIsPassOk(regexStrong.test(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      return;
    }

    if ([name, email, password, confirmPass].includes('')) {
      toast.error('All fields are required');
      return;
    }

    if (!regexEmail.test(email)) {
      toast.error('Invalid email');
      return;
    }

    if (!regexStrong.test(password)) {
      toast.error('The password is weak');
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    try {
      await axiosClient.post('/admins', user);

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPass('');

      toast.success('New user created', { autoClose: 3500 });
      setTimeout(() => {
        navigate('/');
      }, 3500);
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        error.response.data.errors.map((error) => toast.error(error.msg));
      }
    }
  };

  return (
    <div className="h-screen md:flex">
      <ToastContainer />
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-green-800 to-green-400 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">
            The Vine Centre
          </h1>
          <p className="text-white mt-1">
            Create your account for administrator
          </p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-5 items-center bg-white">
        <form className="bg-white" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Sign Up!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            The Vine Centre Manager
          </p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
            />
          </div>

          {!isPassOk && (
            <div>
              <ShowAlert
                title="The password must have at least 8 characters."
                type={length8 ? 'success' : 'error'}
              />
              <ShowAlert
                title="The password must have at least one capital letter."
                type={hasUpper ? 'success' : 'warning'}
              />
              <ShowAlert
                title="The password must have at least one lowercase."
                type={hasLower ? 'success' : 'warning'}
              />
              <ShowAlert
                title="The password must have at least one number."
                type={hasNumber ? 'success' : 'warning'}
              />
              <ShowAlert
                title="Password must have at least one special character."
                type={hasSpecial ? 'success' : 'warning'}
              />
            </div>
          )}

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name="confirm"
              id="confirm"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confim Password"
            />
          </div>

          {confirmPass && password !== confirmPass && (
            <ShowAlert title="Passwords don't match." type="error" />
          )}

          <button
            type="submit"
            className="block w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Create account
          </button>
          <div>
            <Link
              to="/forgot-password"
              className="text-sm block text-center ml-2 hover:text-green-500 cursor-pointer"
            >
              Forgot Password?
            </Link>
            <Link
              to="/"
              className="text-sm block text-center ml-2 hover:text-green-500 cursor-pointer"
            >
              Already have an account? Login!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
