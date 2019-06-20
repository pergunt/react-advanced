import React from 'react';

/**
 * @returns {*}
 * @constructor
 */
const ErrorField = (
  {
    input,
    type,
    meta: {
      error,
      touched
    }
  }
) => {
  const errorText = error && touched && <div className='error'>{error}</div>;
  return (
    <div>
      <label>{input.name}</label>
      <input {...input} type={type} />
      {errorText}
    </div>
  );
};
export default ErrorField;
