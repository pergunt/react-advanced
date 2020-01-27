import React, {
  useEffect,
  useRef
} from 'react';

import {
  Table,
  Column
} from 'react-virtualized';
import {TransitionMotion, spring} from 'react-motion';

import {fetchPeople, peopleListSelector} from "../../ducks/people";
import {connect} from "react-redux";


function PeopleTable(
  {
    people,
    fetchPeople,
  }
) {
  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);
  const table = useRef();
  const prevProps = useRef();
  useEffect(() => {
    const prev = prevProps.current;
    if (prev && prev.length < people.length) {
      setTimeout(() => table.current.scrollToRow(people.length), 100)
    }
    prevProps.current = people;
  });

  const getStyles = () => {
    return people.map(person => ({
      style: {
        opacity: spring(1, {
          stiffness: 150
        }),
      },
      key: person.uid,
      data: person,
    }))
  };
// willEnter should return style from what this style applied
  const willEnter = () => ({
    opacity: 0
  });

  return people.length && (
    <TransitionMotion
      styles={getStyles}
      willEnter={willEnter}
    >
      {
        (interpolatedStyles) => {
          return (
            <Table
              width={600}
              height={300}
              rowHeight={40}
              rowGetter={({ index }) => people[index]}
              rowCount={interpolatedStyles.length}
              rowStyle={({ index }) => index < 0 ? {} : interpolatedStyles[index].style}
              ref={table}
            >
              <Column dataKey='firstName' label='First name' width={200}/>
              <Column dataKey='lastName' label='Last name' width={200}/>
              <Column dataKey='email' label='Email' width={200}/>
            </Table>
          )
        }
      }
    </TransitionMotion>
  );
}
export default connect(state => {
  return {
    people: peopleListSelector(state)
  }
}, {fetchPeople})(PeopleTable)