import React from 'react';

import {reduxForm, Field} from 'redux-form';
import ErrorField from './ErrorField'

import emailValidator from 'email-validator';

/**
 * @returns {*}
 * @constructor
 */
const SignUpForm = (
  {
    handleSubmit
  }
) => {
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <Field name='email' component={ErrorField} />
        <Field name='password' component={ErrorField} type='password' />
        <div>
          <input type='submit'/>
        </div>
      </form>
    </div>
  );
};

const validate = ({email, password}) => {
  const errors = {};

  if (!email) errors.email = 'email is required';
  else if (!emailValidator.validate(email)) errors.email = 'invalid email';

  if (!password) errors.password = 'password is required';
  else if (password.length < 8) errors.password = 'password is to short';

  return errors;
};

export default reduxForm({
  form: 'auth',
  validate
})(SignUpForm);
