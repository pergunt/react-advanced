import React from 'react';

const PersonCard = ({style, person}) => {
  const {
    firstName,
    lastName,
    email
  } = person;

  return (
    <div style={style}>
      <h3>{firstName}{lastName}</h3>
      <p>{email}</p>
    </div>
  );
};
export default PersonCard