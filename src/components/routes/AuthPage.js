import React from 'react';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import {NavLink, Switch, Route} from 'react-router-dom';

const AuthPage = () => {

  const onSignInSubmit = (values) => console.log(values);
  const onSignUpSubmit = (values) => console.log(values);

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
    </div>
  );
};
export default AuthPage;
