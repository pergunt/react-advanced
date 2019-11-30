import React from 'react';

function SelectedEventCard({event}) {
  const {
    title,
    when,
    where
  } = event;
    return (
        <div>
          <h3>{title}</h3>
          <p>{where}, {when}</p>
        </div>
    );
}
export default SelectedEventCard