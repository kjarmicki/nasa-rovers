import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import fetch from 'node-fetch';
import rootReducer from './redux/reducers';
import { initRovers } from './redux/actions';
import roversRepositoryCreator from './repositories/rovers';
import photosRepositoryCreator from './repositories/photos';
import nasaApiClientCreator from './clients/nasa-api';
import App from './views/App';

const apiClient = nasaApiClientCreator(fetch, {
  apiKey: NASA_API_KEY || 'DEMO_KEY',
});
const roversRepository = roversRepositoryCreator(apiClient);
const photosRepository = photosRepositoryCreator(apiClient);
const dependencies = { roversRepository, photosRepository };
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
