import React from 'react';

import {reduxForm, Field} from 'redux-form';
import ErrorField from './ErrorField'

/**
 * @returns {*}
 * @constructor
 */
const SignInForm = (
  {
    handleSubmit
  }
) => {
  return (
    <div>
      <h2>Sign In</h2>
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

export default reduxForm({
  form: 'auth',
})(SignInForm);
