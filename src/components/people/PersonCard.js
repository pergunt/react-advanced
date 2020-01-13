import React, {
  useEffect
} from 'react';

import {useDrag} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';


const collect = (monitor) => {
  return {
    isDragging: monitor.isDragging(),
  }
};

const PersonCard = ({style, person}) => {
  const [{isDragging}, drag, preview] = useDrag({
    item: {
      type: 'person'
    },
    begin() {
      return {
        personUid: person.uid
      };
    },
    collect
  });
  useEffect(() => {
    preview(getEmptyImage())
  }, []);
  const {
    firstName,
    lastName,
    email
  } = person;

  const dragStyle = {
    backgroundColor: isDragging ? '#ffa500' : 'white',
    color: isDragging ? 'white' : '#000'
  }
  return (
    <div style={{...style, ...dragStyle}} className={isDragging ? 'isDragging' : ''}>
      <h3 ref={drag}>{firstName}{lastName}</h3>
      <p>{email}</p>
    </div>
  );
};
export default PersonCard
