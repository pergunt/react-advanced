import React from 'react';

import {Route, Switch, Link} from 'react-router-dom';

import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import PersonPage from './routes/PersonPage';
import EventsPage from './routes/EventsPage';
import ProtectedRoute from './common/ProtectedRoute';

import {connect} from 'react-redux';
import {moduleName, signOut} from '../ducks/auth';

import CustomDragLayer from './CustomDragLayer';

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
      <ul>
        <li><Link to='/admin'>Admin</Link></li>
        <li><Link to='/people'>People</Link></li>
        <li><Link to='/events'>Events</Link></li>
      </ul>
      <CustomDragLayer />
      <Switch>
        <ProtectedRoute path='/admin' component={AdminPage} />
        <ProtectedRoute path='/people' component={PersonPage} />
        <ProtectedRoute path='/events' component={EventsPage} />
        <Route path='/auth' component={AuthPage} />
      </Switch>
    </div>
  );
}
export default connect( state => ({
  signedIn: !!state[moduleName].user
}), {signOut})(Root);
