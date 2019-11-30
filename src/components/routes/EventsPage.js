import React from 'react';

import VirtualizedEventList from '../events/VirtualizedEventList'
import Loader from '../common/Loader'

import {connect} from 'react-redux';
import {
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
      {loading && <Loader />}
    </div>
  );
};
export default connect(state => {
  return {
    loading:  state[moduleName].loading
  };
})(EventsPage);
