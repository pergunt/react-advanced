import React from 'react';

import {reduxForm, Field} from 'redux-form';
import ErrorField from "../common/ErrorField";

import emailValidator from 'email-validator';

/**
 * @param handleSubmit
 * @returns {*}
 * @constructor
 */
const PersonForm = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name='firstName' component={ErrorField} />
      <Field name='lastName' component={ErrorField} />
      <Field name='email' component={ErrorField} />
      <div>
        <input type='submit'/>
      </div>
    </form>
  );
};

const validate = ({email, firstName}) => {
  const errors = {};

  if (!email) errors.email = 'email is required';
  else if (!emailValidator.validate(email)) errors.email = 'invalid email';

  if (!firstName) errors.firstName = 'firstName is required';

  return errors;
};

export default reduxForm({
  form: 'people',
  validate
})(PersonForm)
