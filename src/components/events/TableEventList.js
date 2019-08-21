import React, {useEffect} from 'react';

/**
 * @param {string} uid
 * @param {Function} selectEvent
 * @returns {function(): *}
 */
function onRowClick(uid, selectEvent) {
  return () => selectEvent(uid);
}
/**
 * @param {Array} events
 * @param {Function} selectEvent
 * @returns {*}
 */
function getRows(events, selectEvent) {
  return events.map( ({uid, title, where, month}) => (
    <tr
      key={uid}
      className='test-event-list__row'
      onClick={onRowClick(uid, selectEvent)}
    >
      <td>{title}</td>
      <td>{where}</td>
      <td>{month}</td>
    </tr>
  ))
}

/**
 * @param {Array} events
 * @param {Function} fetchAll
 * @param {Function}selectEvent
 * @returns {*}
 * @constructor
 */
const TableEventList = (
  {
    events,
    fetchAll,
    selectEvent
  }
) => {

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div>
      <table>
        <tbody>
          {getRows(events, selectEvent)}
        </tbody>
      </table>
    </div>
  );
};
export default TableEventList
