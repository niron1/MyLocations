import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import HomeScreen from './containers/Home';
import App from './components/App';
import { loadState, saveState } from './localStorage';

const middleware = [];

middleware.push(thunk);

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);
saveState(store.getState());
store.subscribe(() => { saveState(store.getState()); });

ReactDOM.render(
  <Provider store={store}>
    <App>
      <HomeScreen />
    </App>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
