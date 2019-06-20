import React from 'react';
import {Route} from 'react-router-dom';
import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';

/**
 * @returns {*}
 * @constructor
 */
const Root = () => {
  return (
    <div>
      root
      <Route path='/admin' component={AdminPage} />
      <Route path='/auth' component={AuthPage} />
    </div>
  );
}
export default Root;
