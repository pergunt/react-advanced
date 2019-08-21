import React, {
  useEffect
} from 'react';

import {connect} from 'react-redux';
import {moduleName, fetchAll} from '../../ducks/events';

const EventList = (
  {
    fetchAll,
    events,
  }
) => {
  useEffect(() => {
    fetchAll();
  }, []);
  console.log(events);
  return (
    <div>
      EventList
    </div>
  );
};
export default connect(state => {
  return {
    events: state[moduleName].entities
  };
}, {fetchAll})(EventList);
