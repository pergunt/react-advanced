import React from 'react';

import {connect} from 'react-redux';
import {addPerson} from '../../ducks/people'

import PersonForm from '../people/PersonForm'

/**
 * @param addPerson
 * @returns {*}
 * @constructor
 */
const PersonPage = ({addPerson}) => {
  const onSubmit = ({email, firstName, lastName}) => addPerson({firstName, lastName, email});
  return (
    <div>
      <h1>PersonPage</h1>
      <PersonForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, {addPerson})(PersonPage)
