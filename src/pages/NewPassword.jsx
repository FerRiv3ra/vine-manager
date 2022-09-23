import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ShowAlert from '../components/ShowAlert';
import axiosClient from '../config/axiosClient';

const NewPassword = () => {
  const regexStrong = new RegExp(
    '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$'
  );
  const [length8, setLength8] = useState(false);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [isPassOk, setIsPassOk] = useState(true);
  const [password, setPassword] = useState('');

  const { token } = useParams();
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

    if (!isPassOk) {
      toast.error('Invalid password');
      return;
    }

    try {
      const { data } = await axiosClient.post(
        `/admins/forgot-password/${token}`,
        { password }
      );

      toast.success(data.msg, { autoClose: 3500 });

      setPassword('');

      setTimeout(() => {
        navigate('/');
      }, 3500);
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error(error.response.data.errors[0].msg);
      }
    }
  };

  return (
    <div class="antialiased bg-gradient-to-br from-green-100 to-white">
      <ToastContainer />
      <div class="container px-6 mx-auto">
        <div class="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
          <div class="flex flex-col w-full">
            <div>
              <svg
                class="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <h1 class="text-5xl text-gray-800 font-bold">New password</h1>
            <p class="w-5/12 mx-auto md:mx-0 text-gray-500">
              Update your password and regain access to your account.
            </p>
          </div>
          <div class="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
            <div class="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 class="text-2xl font-bold text-gray-800 text-left mb-5">
                New password
              </h2>
              <form onSubmit={handleSubmit} class="w-full">
                <div id="input" class="flex flex-col w-full my-5">
                  <label for="password" class="text-gray-500 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="Please insert your new password"
                    class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
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

                <div id="button" class="flex flex-col w-full my-5">
                  <button
                    type="submit"
                    class="w-full py-4 bg-green-600 rounded-lg text-green-100"
                  >
                    <div class="flex flex-row items-center justify-center">
                      <div class="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          class="w-4 h-4 fill-green-100"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"
                          />
                        </svg>
                      </div>
                      <p class="font-bold">Save</p>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
