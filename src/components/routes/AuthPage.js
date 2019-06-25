import React from 'react';

import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import Loader from '../common/Loader'

import {NavLink, Switch, Route} from 'react-router-dom';

import {connect} from 'react-redux';
import {signUp, moduleName} from '../../ducks/auth'

/**
 * @param {Function} signUp
 * @param {Boolean} loading
 * @returns {*}
 * @constructor
 */
const AuthPage = (
  {
    signUp,
    loading
  }
) => {

  const onSignInSubmit = (values) => console.log(values);
  const onSignUpSubmit = ({email, password}) => signUp(email, password);

  return (
    <div>
      <h1>AuthPage</h1>
      <NavLink to='/auth/signin' activeClassName='activeLink'>
        Sign In
      </NavLink>
      <NavLink to='/auth/signup' activeClassName='activeLink'>
        Sign Up
      </NavLink>
      <Switch>
        <Route path='/auth/signin' render={() => <SignInForm onSubmit={onSignInSubmit} />} />
        <Route path='/auth/signup' render={() => <SignUpForm onSubmit={onSignUpSubmit} />} />
      </Switch>
      <Loader loading={loading}/>
    </div>
  );
};
export default connect(state => {
  return {
    loading: state[moduleName].loading
  }
}, {signUp})(AuthPage);
