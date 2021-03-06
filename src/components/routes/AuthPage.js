import React from 'react';

import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import Loader from '../common/Loader'

import {NavLink, Switch, Route} from 'react-router-dom';

import {connect} from 'react-redux';
import {signUp, signIn, moduleName} from '../../ducks/auth'

/**
 * @param {Function} signUp
 * @param {Function} signIn
 * @param {Object} user
 * @param {Boolean} loading
 * @returns {*}
 * @constructor
 */
const AuthPage = (
  {
    signUp,
    signIn,
    user,
    loading
  }
) => {

  const onSignInSubmit = ({email, password}) => signIn(email, password);
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
        <Route path='/auth/signin' render={() => <SignInForm user={user} onSubmit={onSignInSubmit} />} />
        <Route path='/auth/signup' render={() => <SignUpForm onSubmit={onSignUpSubmit} />} />
      </Switch>
      {loading && <Loader />}
    </div>
  );
};
export default connect(state => {
  const {
    loading,
    user
  } = state[moduleName];
  return {
    loading,
    user
  }
}, {signUp, signIn})(AuthPage);
