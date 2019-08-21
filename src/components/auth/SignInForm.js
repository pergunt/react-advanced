import React, {
  useEffect
} from 'react';

import {reduxForm, Field} from 'redux-form';
import ErrorField from '../common/ErrorField'

import {validate} from './SignUpForm';

/**
 * @param {Function} handleSubmit
 * @param {Object|null} user
 * @param {Function} reset
 * @returns {*}
 * @constructor
 */
const SignInForm = (
  {
    handleSubmit,
    user,
    reset
  }
) => {
  useEffect(() => {
    reset();
    return reset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
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
  validate
})(SignInForm);
