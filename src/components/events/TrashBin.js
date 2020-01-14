import React from 'react';

import {useDrop} from 'react-dnd';
import {connect} from 'react-redux';
import {stateSelector, deleteEvent} from '../../ducks/events';

import Loader from '../common/Loader'
import {Motion, spring, presets} from 'react-motion'

const collect = (monitor) => {
  return {
    hovered: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
};

function TrashBin({deleteEvent, loading}) {
  const [collectedProps, drop] = useDrop({
    accept: 'event',
    drop(props) {
      deleteEvent(props.uid);
    },
    collect
  });
  const {hovered, canDrop} = collectedProps;
  const style = {
    backgroundColor: `${canDrop ? hovered ? 'green' : 'skyblue' : '#fff'}`,
    border: `2px solid black`,
    width: 100, height: 100,
    top: 0, right: 0,
    position: 'fixed',
  };
  return (
    <Motion
      defaultStyle={{opacity: 0}}
      style={{
        opacity: spring(1,
          {
            ...presets.gentle,
            stiffness: presets.noWobble.stiffness / 20,
            damping: presets.noWobble.damping * 2,
          })
      }}
    >
      {
        interpolatedStyle => {
          return (
            <div style={{...style, ...interpolatedStyle}} ref={drop}>
              Trash bin
              {loading && <Loader/>}
            </div>
          )
        }
      }
    </Motion>
  );
}
export default connect(state => {
  return {
    loading: stateSelector(state).loading
  }
}, {deleteEvent})(TrashBin);