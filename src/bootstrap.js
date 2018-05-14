import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import fetch from 'node-fetch';
import rootReducer from './redux/reducers';
import { initRovers } from './redux/actions';
import roversRepositoryCreator from './repositories/rovers';
import nasaApiClientCreator from './clients/nasa-api';
import App from './views/App';

const roversRepository = roversRepositoryCreator(nasaApiClientCreator(fetch, {
  apiKey: process.env.NASA_API_KEY,
}));
const dependencies = { roversRepository };
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(dependencies))),
);

store.dispatch(initRovers());
ReactDOM.render(
  (
      <Provider store={store}>
        <App />
      </Provider>
  ), document.querySelector('#app'),
);
