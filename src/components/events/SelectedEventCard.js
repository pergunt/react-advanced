import React from 'react';

import {DropTarget} from 'react-dnd';

import {connect} from 'react-redux';
import {addEventPerson, peopleListSelector} from '../../ducks/people'

function SelectedEventCard({event, people, connectDropTarget, canDrop, hovered}) {
  const {
    title,
    when,
    where
  } = event;
  const dropStyles = {
    border: `1px solid ${canDrop ? 'red' : 'black'}`,
    backgroundColor: hovered ? 'green' : 'white'
  };
  const peopleElement = people && (
    <p>
      {people.map( person => person.email).join(', ')}
    </p>
  );
  console.log(people);
    return connectDropTarget(
        <div style={dropStyles}>
          <h3>{title}</h3>
          <p>{where}, {when}</p>
          {peopleElement}
        </div>
    );
}
const spec = {
  drop(props, monitor) {
    const personUid = monitor.getItem().uid;
    const eventUid = props.event.uid;
    props.addEventPerson(eventUid, personUid);
    return {
      eventUid, personUid
    };
  }
};
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()
  }
};

export default connect((state, props) => {
  return {
    people: peopleListSelector(state).filter(person => person.events.includes(props.event.uid))
  }
}, {addEventPerson})(DropTarget(['person'], spec, collect)(SelectedEventCard));