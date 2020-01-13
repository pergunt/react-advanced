import React, {useEffect} from 'react';

import {defaultTableRowRenderer} from 'react-virtualized';

import {useDrag} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';

function TableRow(props) {
  const [collectedProps, drag, preview] = useDrag({
    item: {
      type: 'event'
    },
    begin() {
      return {
        uid: props.rowData.uid
      };
    },
  });
  useEffect(() => {
    preview(getEmptyImage());
  }, []);
  const tr = defaultTableRowRenderer(props);
  return (
    <div ref={drag}>
      {tr}
    </div>
  )
}
export default TableRow