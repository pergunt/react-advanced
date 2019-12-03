import React from 'react';

import {useDrop} from 'react-dnd';

import {connect} from 'react-redux';
import {addEventPerson, peopleListSelector} from '../../ducks/people'

const collect = (monitor) => {
  return {
    hovered: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
};

function SelectedEventCard({event, people, addEventPerson}) {
  const [collectedProps, drop] = useDrop({
    accept: 'person',
    drop(props) {
      const personUid = props.personUid;
      const eventUid = event.uid;
      addEventPerson(eventUid, personUid);
      return {
        eventUid, personUid
      };
    },
    collect
  });
  const {
    title,
    when,
    where
  } = event;
  const {
    canDrop,
    hovered
  } = collectedProps;
  const dropStyles = {
    border: `1px solid ${canDrop ? 'red' : 'black'}`,
    backgroundColor: hovered ? 'green' : 'white',
    color: hovered ? 'white' : 'black',
  };
  const peopleElement = people && (
    <p>
      {people.map( person => person.email).join(', ')}
    </p>
  );

  return (
    <div ref={drop} style={dropStyles} className={canDrop ? 'canDrop' : ''}>
      <h3>{title}</h3>
      <p>{where}, {when}</p>
      {peopleElement}
    </div>
  );
}

export default connect((state, {event}) => {
  return {
    people: peopleListSelector(state).filter(({events}) => events.includes(event.uid))
  }
}, {addEventPerson})(SelectedEventCard);
