import React, {
  useEffect
} from 'react';

import {connect} from 'react-redux';
import {
  addPerson,
  fetchPeople,
} from '../../ducks/people'

import PersonForm from '../people/PersonForm'
import VirtualizedPersonList from '../people/VirtualizedPersonList'

/**
 * @param {Function} addPerson
 * @returns {*}
 * @constructor
 */
const PersonPage = (
  {
    addPerson,
  }
) => {

  const onSubmit = ({email, firstName, lastName}) => addPerson({firstName, lastName, email});

  return (
    <div>
      <h1>PersonPage</h1>
      <PersonForm onSubmit={onSubmit} />
      <VirtualizedPersonList />
    </div>
  );
};

export default connect(null, {addPerson})(PersonPage)
