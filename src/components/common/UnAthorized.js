import React from 'react';
import {Link} from 'react-router-dom'

/**
 * @returns {*}
 * @constructor
 */
const UnAuthorized = () => {
  return (
    <h1>
      Unauthorized, please <Link to='/auth/signin'>SignIn</Link>
    </h1>
  );
};
export default UnAuthorized;
