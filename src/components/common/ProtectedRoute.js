import React from 'react';

import UnAuthorized from './UnAthorized'

import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {moduleName} from '../../ducks/auth';

/**
 * @param {React.ReactElement} ProtectedComponent
 * @param {Boolean} authorized
 * @param {object} rest
 * @returns {*}
 * @constructor
 */
const ProtectedRoute = (
  {
    component: ProtectedComponent,
    authorized,
    ...rest
  }
) => {
  const renderProtected = (routeProps) => <ProtectedComponent {...routeProps} />;
  return authorized ? <Route {...rest} render={renderProtected} /> : <UnAuthorized />;
};
export default connect(state => ({
  authorized: !!state[moduleName].user
}))(ProtectedRoute);
