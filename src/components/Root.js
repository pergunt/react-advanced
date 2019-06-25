import React from 'react';

import {Route, Switch, Link} from 'react-router-dom';

import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import PersonPage from './routes/PersonPage';
import ProtectedRoute from './common/ProtectedRoute';

import {connect} from 'react-redux';
import {moduleName, signOut} from '../ducks/auth';

/**
 * @returns {*}
 * @constructor
 */
const Root = ({signOut, signedIn}) => {
  const button = signedIn
    ? <button onClick={() => {
      signOut();
    }
    }>Sign Out</button>
    : <Link to='/auth/signin'>Sign In</Link>;
  return (
    <div>
      Root
      {button}
      <Switch>
        <ProtectedRoute path='/admin' component={AdminPage} />
        <Route path='/auth' component={AuthPage} />
        <Route path='/people' component={PersonPage} />
      </Switch>
    </div>
  );
}
export default connect( state => ({
  signedIn: !!state[moduleName].user
}), {signOut})(Root);
