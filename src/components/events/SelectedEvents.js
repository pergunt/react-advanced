import React from 'react';

import {connect} from 'react-redux'

import {selectedEventsSelector} from  '../../ducks/events'
import SelectedEventCard from './SelectedEventCard';

import {TransitionMotion, spring, presets} from 'react-motion'

function SelectedEvents({events}) {
  const getStyles = () => {
    return events.map(event => ({
      style: {
        opacity: spring(1, {
          stiffness: 150
        }),
        height: spring(100, {
          stiffness: 150
        }),
      },
      key: event.uid,
      data: event
    }))
  };
  const willLeave = () => ({
    opacity: spring(0, {
      stiffness: 250
    }),
    height: spring(0, {
      stiffness: 250
    }),
  });
  // willEnter should return style from what this style applied
  const willEnter = () => ({
    opacity: 0,
    height: 0,
  });
  return (
    <TransitionMotion
      styles={getStyles}
      willLeave={willLeave}
      willEnter={willEnter}
    >
      {
        (interpolated) => {
          return (
            <div>
              {
                interpolated.map( config => (
                  <div style={config.style} key={config.key}>
                    <SelectedEventCard event={config.data} />
                  </div>
                ))
              }
            </div>
          )
        }
      }
    </TransitionMotion>
  );
}

export default connect(state => {
  return {
    events: selectedEventsSelector(state)
  }
}, {})(SelectedEvents)