import React from 'react';

import VirtualizedEventList from '../events/VirtualizedEventList'
import Loader from '../common/Loader'

import {connect} from 'react-redux';
import {
  eventListSelector,
  fetchLazy,
  selectEvent,
  moduleName
} from '../../ducks/events';

const EventsPage = (
  {
    fetchLazy,
    loading,
    loaded,
    events,
    selectEvent
  }
) => {

  return (
    <div>
      <h2>Events Page</h2>
      <VirtualizedEventList
        events={events}
        fetchLazy={fetchLazy}
        selectEvent={selectEvent}
        loaded={loaded}
      />
      <Loader loading={loading} />
    </div>
  );
};
export default connect(state => {
  const {
    loading,
    loaded
  } = state[moduleName];
  return {
    events: eventListSelector(state),
    loading,
    loaded
  };
}, {
  fetchLazy,
  selectEvent
})(EventsPage);
