import React, {
  useEffect
} from 'react';

import EventList from '../events/EventList'
import Loader from '../common/Loader'

import {connect} from 'react-redux';
import {eventListSelector, fetchAll, moduleName} from '../../ducks/events';

const EventsPage = (
  {
    fetchAll,
    loading,
    events
  }
) => {

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div>
      <h2>Events Page</h2>
      <Loader loading={loading} />
      <EventList events={events} />
    </div>
  );
};
export default connect(state => {
  return {
    events: eventListSelector(state),
    loading: state[moduleName].loading
  };
}, {fetchAll})(EventsPage);
