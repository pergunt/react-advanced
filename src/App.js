import React from 'react';

import Root from './components/Root';

import {Provider} from 'react-redux';
import store, {history} from './redux';
import {ConnectedRouter} from 'connected-react-router';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root/>
      </ConnectedRouter>
    </Provider>
  );
}
export default App;
