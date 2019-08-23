import React from 'react';

import {
  List
} from 'react-virtualized';

import 'react-virtualized/styles.css';

/**
 * @returns {*}
 * @constructor
 */
const VirtualizedPersonList = (
  {
    people
  }
) => {

  const rowRenderer = ({index, style, key}) => {

    const {
      firstName,
      lastName,
      email
    } = people[index];

    return (
      <div
        key={key}
        style={style}
      >
        <p>{firstName} {lastName}</p>
        {email}
      </div>
    );
  };
  return (
    <List
      width={700}
      height={300}
      rowHeight={50}
      rowCount={people.length}
      rowRenderer={rowRenderer}
    />
  );
};
export default VirtualizedPersonList
