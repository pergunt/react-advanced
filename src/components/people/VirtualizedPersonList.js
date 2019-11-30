import React, {useEffect} from 'react';

import {
  List
} from 'react-virtualized';

import Loader from '../common/Loader'
import PersonCard from './PersonCard'

import {connect} from 'react-redux';
import {
  fetchPeople,
  peopleListSelector,
  moduleName
} from '../../ducks/people'

import 'react-virtualized/styles.css';

/**
 * @returns {*}
 * @constructor
 */
const VirtualizedPersonList = (
  {
    people,
    loading,
    fetchPeople,
  }
) => {
  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  const rowRenderer = ({index, style, key}) => {
    return <PersonCard person={people[index]} style={style} key={key} />;
  };
  if (loading) {
    return  <Loader />
  }
  return (
    <List
      width={700}
      height={300}
      rowHeight={100}
      rowCount={people.length}
      rowRenderer={rowRenderer}
    />
  );
};
export default connect(state => {
  return {
    people: peopleListSelector(state),
    loading: state[moduleName].loading
  }
}, {fetchPeople})(VirtualizedPersonList)
