import React, {useEffect} from 'react';

import {Table, Column, InfiniteLoader} from 'react-virtualized';

import 'react-virtualized/styles.css';
import {eventListSelector, fetchLazy, moduleName, selectEvent} from "../../ducks/events";
import {connect} from "react-redux";

import TableRow from './TableRow';

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
    loaded,
    fetchLazy,
    selectEvent
  }
) => {

  useEffect(() => {
    fetchLazy();
  }, [fetchLazy]);
  /**
   * @param {Object} rowData
   * @returns {function(): *}
   */
  const onRowClick = ({rowData}) => selectEvent(rowData.uid);
  const rowGetter = ({index}) => events[index];

  const isRowLoaded = ({index}) => index < events.length;
  const loadMoreRows = () => {
    console.log('load -more');
    fetchLazy();
  };
  const rowRenderer = (props) => <TableRow {...props} />;

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      rowCount={loaded ? events.length : events.length + 1}
      loadMoreRows={loadMoreRows}
    >
      {
        ({onRowsRendered, registerChild}) => (
          <Table
            ref={registerChild}
            onRowsRendered={onRowsRendered}
            rowCount={events.length}
            rowGetter={rowGetter}
            width={700}
            height={300}
            rowHeight={40}
            headerHeight={70}
            overscanRowCount={5}
            onRowClick={onRowClick}
            rowRenderer={rowRenderer}
          >
            <Column
              dataKey='title'
              label='title'
              width={250}
            />
            <Column
              dataKey='where'
              label='where'
              width={250}
            />
            <Column
              dataKey='month'
              label='when'
              width={200}
            />
          </Table>
        )
      }
    </InfiniteLoader>
  );
};
export default connect(state => {
  return {
    events: eventListSelector(state),
    loaded: state[moduleName].loaded
  };
}, {
  fetchLazy,
  selectEvent
})(TableEventList);
