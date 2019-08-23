import React, {
  useEffect
} from 'react';

import {connect} from 'react-redux';
import {
  addPerson,
  fetchPeople,
  peopleListSelector
} from '../../ducks/people'

import PersonForm from '../people/PersonForm'
import VirtualizedPersonList from '../people/VirtualizedPersonList'

/**
 * @param {Function} addPerson
 * @param {Function} fetchPeople
 * @param {Array} people
 * @returns {*}
 * @constructor
 */
const PersonPage = (
  {
    addPerson,
    fetchPeople,
    people
  }
) => {

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  const onSubmit = ({email, firstName, lastName}) => addPerson({firstName, lastName, email});

  return (
    <div>
      <h1>PersonPage</h1>
      <PersonForm onSubmit={onSubmit} />
      <VirtualizedPersonList people={people} />
    </div>
  );
};

export default connect(state => {
  return {
    people: peopleListSelector(state)
  }
}, {addPerson, fetchPeople})(PersonPage)
