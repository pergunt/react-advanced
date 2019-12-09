import React from 'react';

import {connect} from 'react-redux'
import {personSelector} from '../../ducks/people'

function PersonCardDragPreview({person}) {
    return <h1>{person.firstName}</h1>;
}
export default connect((state, props) => {
  return {
    person: personSelector(state, props)
  }
})(PersonCardDragPreview)