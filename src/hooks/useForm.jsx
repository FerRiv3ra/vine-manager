import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }, type = 'String') => {
    let { value } = target;
    switch (type) {
      case 'Boolean':
        value = value === 'true' ? true : false;
        break;
      case 'Number':
        value = Number(value);
        break;
      default:
        break;
    }
    setValues({
      ...values,
      [target.name]: value,
    });
  };

  const handleEdit = (user) => {
    setValues(user);
  };

  return [values, handleInputChange, reset, handleEdit];
};
