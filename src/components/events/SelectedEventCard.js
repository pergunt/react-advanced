import React from 'react';

import {DropTarget} from 'react-dnd'

function SelectedEventCard({event, connectDropTarget, canDrop, hovered}) {
  const {
    title,
    when,
    where
  } = event;
  const dropStyles = {
    border: `1px solid ${canDrop ? 'red' : 'black'}`,
    backgroundColor: hovered ? 'green' : 'white'
  };
    return connectDropTarget(
        <div style={dropStyles}>
          <h3>{title}</h3>
          <p>{where}, {when}</p>
        </div>
    );
}
const spec = {
  drop(props, monitor) {
    const personUid = monitor.getItem().uid;
    const eventUid = props.event.uid;
    console.log(personUid, '----', eventUid, '----')
  }
};
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()
  }
};

export default DropTarget(['person'], spec, collect)(SelectedEventCard);