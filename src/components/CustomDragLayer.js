import React from 'react';

import {useDragLayer} from 'react-dnd';

import PersonCardDragPreview from './people/PersonCardDragPreview'
import EventDragPreview from './events/EventDragPreview'

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
    offset: monitor.getSourceClientOffset(),
    item: monitor.getItem(),
    itemType: monitor.getItemType()
  };
};

const previewMap = {
  person: PersonCardDragPreview,
  event: EventDragPreview
};

const CustomDragLayer = () => {
  const {isDragging, offset, item, itemType} = useDragLayer(collect);
  if (!isDragging) {
    return null;
  }
  const getItem = () => {
    const {x, y} = offset || {};
    const style = {
      transform: `translate(${x}px, ${y}px)`
    };
    const PreviewComponent = previewMap[itemType];
    return PreviewComponent ? <div style={style}><PreviewComponent {...item} /></div> : null;
  };
  const layerItem = getItem();
  if (!layerItem) return null;
  return (
    <div style={laterStyle}>
      ${layerItem}
    </div>
  );
};

export default CustomDragLayer;
