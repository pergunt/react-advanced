import React from 'react';

import Root from './components/Root';

import {Provider} from 'react-redux';
import store, {history} from './redux';
import {ConnectedRouter} from 'connected-react-router';

import './config';
import './mocks/index';

import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <DndProvider backend={HTML5Backend}>
          <Root/>
        </DndProvider>
      </ConnectedRouter>
    </Provider>
  );
}
export default App;
