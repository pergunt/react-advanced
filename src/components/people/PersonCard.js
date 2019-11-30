import React from 'react';

import {DragSource} from 'react-dnd';

const PersonCard = ({style, person, connectDragSource, isDragging}) => {
  const {
    firstName,
    lastName,
    email
  } = person;
  const dragStyle = {
    backgroundColor:  isDragging ? 'green' : 'white'
  }
  return isDragging ? null : (
    <div style={{...style, ...dragStyle}}>
      {connectDragSource(<h3>{firstName}{lastName}</h3>)}
      <p>{email}</p>
    </div>
  );
};
const spec = {
  beginDrag(props) {
    return {
      uid: props.person.uid
    };
  }
};
const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
};

export default DragSource('person', spec, collect)(PersonCard)