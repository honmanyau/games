import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Circlet from 'circlet';
import store from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Circlet />
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
