import { useEffect, useRef, useState } from 'react';

import React from 'react';

import { ToastContainer } from 'react-toastify';

import { useForm } from '../hooks/useForm';
import useUsers from '../hooks/useUsers';
import { useNavigate, useParams } from 'react-router-dom';

const FormUser = () => {
  const [policy, setPolicy] = useState(false);

  const radioPensionerYesRef = useRef(null);
  const radioPensionerNoRef = useRef(null);
  const radioChildNoRef = useRef(null);
  const radioChildYesRef = useRef(null);

  const { submitUser, showAlert, user, editUser } = useUsers();

  const navigate = useNavigate();
  const params = useParams();

  const [formValues, handleInputChange, reset, handleEdit] = useForm({
    address: '',
    firstName: '',
    lastName: '',
    noHousehold: '',
    child: false,
    childCant: '',
    dob: '',
    pensioner: false,
    postcode: '',
    housingProvider: '',
    phone: '',
    town: '',
  });

  const {
    address,
    firstName,
    lastName,
    noHousehold,
    child,
    childCant,
    dob,
    postcode,
    housingProvider,
    phone,
    pensioner,
    town,
  } = formValues;

  useEffect(() => {
    if (params.id && user.uid) {
      const [d, m, y] = user.dob.slice(0, 10).split('/');
      handleEdit({
        address: user.address,
        firstName: user.firstName,
        lastName: user.lastName,
        noHousehold: user.noHousehold,
        postcode: user.postcode,
        housingProvider: user.housingProvider,
        phone: user.phone,
        town: user.town,

        dob: `${y}-${m}-${d}`,

        child: user.child,
        childCant: user.childCant,
      });
      if (user.child) {
        radioChildYesRef.current.checked = true;
      }

      if (user.pensioner) {
        radioPensionerYesRef.current.checked = true;
      }

      setPolicy(true);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [address, firstName, lastName, dob, postcode, phone, town].includes('')
    ) {
      showAlert('All fields are required');
      return;
    }

    if (noHousehold < 1) {
      showAlert('Number in household no valid');
      return;
    }

    if (child && childCant === 0) {
      showAlert('Number of children is required');
      return;
    }

    if (!policy) {
      showAlert('It is necessary to accept the terms');
      return;
    }

    let resp;

    if (params.id) {
      resp = await editUser({
        ...formValues,
        uid: params.id,
      });
    } else {
      resp = await submitUser(formValues);
    }

    if (resp.errors) {
      resp.errors.forEach((e) => {
        showAlert(e.msg);
      });
      return;
    }

    showAlert(
      params.id
        ? `User with ID ${resp.customerId} edited`
        : `User ID ${resp.customerId} assigned`,
      false,
      3500
    );

    if (child) {
      radioChildNoRef.current.checked = true;
    }
    if (pensioner) {
      radioPensionerNoRef.current.checked = true;
    }
    setPolicy(false);
    reset();
    setTimeout(() => {
      navigate('/dashboard/users');
    }, 3500);
  };

  return (
    <form
      className="bg-white py-7 px-5 md:w-2/3 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <ToastContainer />

      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="name"
        >
          First Name *
        </label>
        <input
          id="name"
          type="text"
          name="firstName"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md capitalize"
          placeholder="First name"
          value={firstName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="name"
        >
          Last Name *
        </label>
        <input
          id="name"
          type="text"
          name="lastName"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md capitalize"
          placeholder="Last name"
          value={lastName}
          onChange={handleInputChange}
        />
      </div>
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
            name="noHousehold"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Number in household"
            value={noHousehold}
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
              ref={radioChildNoRef}
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
              ref={radioChildYesRef}
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
              name="childCant"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="How many children?"
              value={childCant}
              onChange={(e) => handleInputChange(e, 'Number')}
            />
          </div>
        )}
      </div>

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
          htmlFor="address"
        >
          Address *
        </label>
        <input
          id="address"
          type="text"
          name="address"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md uppercase"
          placeholder="Address"
          value={address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="town"
        >
          Town *
        </label>
        <input
          id="town"
          type="text"
          name="town"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md uppercase"
          placeholder="Town"
          value={town}
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
          name="housingProvider"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Housing provider"
          value={housingProvider}
          onChange={handleInputChange}
        />
      </div>

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

      <label
        className="text-gray-700 uppercase font-bold text-sm text-center block"
        htmlFor="pensioner"
      >
        Pensioner
      </label>
      <div className="flex justify-evenly">
        <div>
          <input
            type="radio"
            id="no"
            name="pensioner"
            value={false}
            ref={radioPensionerNoRef}
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
            name="pensioner"
            ref={radioPensionerYesRef}
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

      <input
        type="submit"
        value={params.id ? 'Save' : 'Create User'}
        className="bg-green-600 w-full mt-3 p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-green-700 transition-colors"
      />
    </form>
  );
};

export default FormUser;
