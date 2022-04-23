import { useRef, useState } from 'react';

import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useForm } from '../hooks/useForm';
import useUsers from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';

const FormUser = () => {
  const [policy, setPolicy] = useState(false);

  const radioRoleRef = useRef(null);
  const radioChildRef = useRef(null);

  const { submitUser } = useUsers();

  const navigate = useNavigate();

  const [formValues, handleInputChange, reset] = useForm({
    role: 'USER_ROLE',
    name: '',
    email: '',
    password: '',
    confirmPass: '',
    no_household: 1,
    child: false,
    child_cant: 0,
    dob: '',
    postcode: '',
    housing_provider: '',
    phone: '',
  });

  const {
    role,
    name,
    email,
    password,
    confirmPass,
    no_household,
    child,
    child_cant,
    dob,
    postcode,
    housing_provider,
    phone,
  } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role.includes('ADMIN') && [email, password, confirmPass].includes('')) {
      if (child) {
        radioChildRef.current.checked = true;
      }
      showAlert('Required fields are empty');
      return;
    }

    if (role.includes('ADMIN') && password.length < 6) {
      showAlert('The password must be at least 6 characters');
      return;
    }

    if (password !== confirmPass) {
      showAlert(`The passwords don't match`);
      return;
    }

    if ([name, dob, postcode, phone].includes('')) {
      showAlert('Required fields are empty');
      return;
    }

    if (
      role.includes('USER') &&
      [no_household, housing_provider].includes('')
    ) {
      showAlert('Required fields are empty');
      return;
    }

    if (child && child_cant === 0) {
      showAlert('Number of children is required');
      return;
    }

    if (role.includes('USER') && !policy) {
      showAlert('It is necessary to accept the terms');
      return;
    }

    const resp = await submitUser(formValues);

    if (resp.errors) {
      resp.errors.forEach((e) => {
        showAlert(e.msg);
      });
      return;
    }

    if (role.includes('ADMIN') && resp.uid) {
      showAlert('New admin created', false);
    } else {
      showAlert(`User ID ${resp.customer_id} assigned`, false);
    }

    radioRoleRef.current.checked = true;

    if (child) {
      radioChildRef.current.checked = true;
    }
    setPolicy(false);
    reset();
    setTimeout(() => {
      navigate('/users');
    }, 6000);
  };

  const showAlert = (msg = '', error = true, autoClose = 5000) => {
    if (error) {
      toast.error(msg);
    } else {
      toast.success(msg, {
        autoClose,
      });
    }
  };

  return (
    <form
      className="bg-white py-7 px-5 md:w-2/3 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <ToastContainer />
      <label
        className="text-gray-700 uppercase font-bold text-sm text-center block"
        htmlFor="role"
      >
        User Type
      </label>
      <div className="flex justify-evenly">
        <div>
          <input
            type="radio"
            id="user"
            name="role"
            ref={radioRoleRef}
            value="USER_ROLE"
            defaultChecked={true}
            onClick={handleInputChange}
            className="checked:accent-green-600"
          />
          <label
            htmlFor="user"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            {' '}
            CUSTOMER
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="admin"
            name="role"
            value="ADMIN_ROLE"
            onClick={handleInputChange}
            className="checked:accent-green-600"
          />
          <label
            htmlFor="admin"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            {' '}
            ADMIN
          </label>
        </div>
      </div>
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="name"
        >
          Name *
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md capitalize"
          placeholder="Name"
          value={name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="email"
        >
          Email {role.includes('ADMIN') && '*'}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
        />
      </div>
      {role.includes('ADMIN') && (
        <div>
          <div>
            <label
              className="text-gray-700 uppercase font-bold text-sm"
              htmlFor="password"
            >
              Password *
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="text-gray-700 uppercase font-bold text-sm"
              htmlFor="confirm-password"
            >
              Confirm Password *
            </label>
            <input
              id="confirm-password"
              type="password"
              name="confirmPass"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
      {role.includes('USER') && (
        <div>
          <div>
            <label
              className="text-gray-700 uppercase font-bold text-sm"
              htmlFor="no-household"
            >
              Number in household *
            </label>
            <input
              id="no-household"
              type="number"
              min="1"
              name="no_household"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Number in household"
              value={no_household}
              onChange={(e) => handleInputChange(e, 'Number')}
            />
          </div>
          <label
            className="text-gray-700 uppercase font-bold text-sm text-center block"
            htmlFor="child"
          >
            Children in household
          </label>
          <div className="flex justify-evenly">
            <div>
              <input
                type="radio"
                id="no"
                name="child"
                value={false}
                ref={radioChildRef}
                defaultChecked={true}
                onClick={(e) => handleInputChange(e, 'Boolean')}
                className="checked:accent-green-600"
              />
              <label
                htmlFor="no"
                className="text-gray-700 uppercase font-bold text-sm"
              >
                {' '}
                NO
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="yes"
                name="child"
                value={true}
                onClick={(e) => handleInputChange(e, 'Boolean')}
                className="checked:accent-green-600"
              />
              <label
                htmlFor="yes"
                className="text-gray-700 uppercase font-bold text-sm"
              >
                {' '}
                YES
              </label>
            </div>
          </div>
          {child && (
            <div>
              <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="child-cant"
              >
                How many children? *
              </label>
              <input
                id="child-cant"
                type="number"
                min="0"
                name="child_cant"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="How many children?"
                value={child_cant}
                onChange={(e) => handleInputChange(e, 'Number')}
              />
            </div>
          )}
        </div>
      )}
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="dob"
        >
          Date of birth *
        </label>
        <input
          id="dob"
          type="date"
          name="dob"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={dob}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="postcode"
        >
          Postcode *
        </label>
        <input
          id="postcode"
          type="text"
          name="postcode"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md uppercase"
          placeholder="Postcode"
          value={postcode}
          onChange={handleInputChange}
        />
      </div>
      {role.includes('USER') && (
        <div>
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="housing-provider"
          >
            Housing provider *
          </label>
          <input
            id="housing-provider"
            type="text"
            name="housing_provider"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Housing provider"
            value={housing_provider}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="phone"
        >
          Phone *
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Phone"
          value={phone}
          onChange={handleInputChange}
        />
      </div>
      {role.includes('USER') && (
        <div>
          <input
            id="policy"
            type="checkbox"
            name="policy"
            className="border p-2 mt-2 placeholder-gray-400 rounded-md"
            value={policy}
            checked={policy}
            onChange={(e) => setPolicy(!policy)}
          />
          <label
            className="text-gray-700 uppercase font-bold text-xs"
            htmlFor="policy"
          >
            {' '}
            I agree to The Vine Centre storing my personal data
          </label>
        </div>
      )}
      <input
        type="submit"
        value="Create User"
        className="bg-green-600 w-full mt-3 p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-green-700 transition-colors"
      />
    </form>
  );
};

export default FormUser;
