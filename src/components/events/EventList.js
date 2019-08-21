import React from 'react';

/**
 * @param {Array} events
 * @returns {*}
 */
function getRows(events) {
  return events.map( ({uid, title, where, month}) => (
    <tr key={uid}>
      <td>{title}</td>
      <td>{where}</td>
      <td>{month}</td>
    </tr>
  ))
}

const EventList = (
  {
    events,
  }
) => {

  return (
    <div>
      <table>
        <tbody>
          {getRows(events)}
        </tbody>
      </table>
    </div>
  );
};
export default EventList
