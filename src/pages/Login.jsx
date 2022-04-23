import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from '../config/axiosClient';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true,
      });
      showAlertTime();
      return;
    }

    try {
      const { data } = await axiosClient.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('x-token', data.token);
      setAuth(data.user);
      navigate('/events');
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
      showAlertTime();
    }
  };

  const showAlertTime = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <>
      <h1 className="text-green-700 font-black text-6xl">
        Login to{' '}
        <span className="text-slate-700 block text-5xl">The Vine Manager</span>
      </h1>

      {showAlert && <Alert alert={alert} />}

      <form
        className="my-6 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="bg-green-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-900 transition-colors"
        />
      </form>
    </>
  );
};

export default Login;
