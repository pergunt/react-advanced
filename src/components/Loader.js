import React from 'react';

/**
 * @param {Boolean} loading
 * @returns {boolean|*}
 * @constructor
 */
const Loader = (
  {
    loading = false
  }
) => {
  return loading && <h1>Loading...</h1>;
};
export default Loader;
