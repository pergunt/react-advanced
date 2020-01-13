import React from 'react';

import {connect} from 'react-redux'
import {entitiesSelector} from '../../ducks/events'

function EventDragPreview({event}) {
  return <h1>{event.title}</h1>;
}
export default connect((state, props) => {
  return {
    event: entitiesSelector(state).find( event => event.uid === props.uid)
  }
})(EventDragPreview)