import React from 'react';

import {useDragLayer} from 'react-dnd';

const laterStyle = {
  position: 'fixed',
  pointerEvents: 'none',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  zIndex: 10000
};

const collect = (monitor) => {
  return {
    isDragging: monitor.isDragging(),
    offset: monitor.getSourceClientOffset()
  };
};

const CustomDragLayer = () => {
  const {isDragging, offset} = useDragLayer(collect);
  if (!isDragging) {
    return null;
  }
  const getItem = () => {
    const {x, y} = offset || {};
    const style = {
      transform: `translate(${x}px, ${y}px)`
    };
    return <div style={style}>Hello DragLayer</div>;
  };
  return (
    <div style={laterStyle}>
      ${getItem()}
    </div>
  );
};

export default CustomDragLayer;
