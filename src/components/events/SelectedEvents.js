import React from 'react';

import {connect} from 'react-redux'

import {selectedEventsSelector} from  '../../ducks/events'
import SelectedEventCard from './SelectedEventCard'

function SelectedEvents({events}) {
    return (
        <div>
          {events.map( event => <SelectedEventCard event={event} key={event.uid} />)}
        </div>
    );
}

export default connect(state => {
  return {
    events: selectedEventsSelector(state)
  }
}, {})(SelectedEvents)