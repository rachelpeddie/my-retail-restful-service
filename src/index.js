import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Saga setup
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
const sagaMiddleware = createSagaMiddleware();


/** -------- SAGAS -------- **/
function* getProductDetails(action) {
  try {
    const redskyResponse = yield axios.get(`/details/name/${action.payload}`)
    const mongoResponse = yield axios.get(`/details/price/${action.payload}`)
    console.log(`price is`, mongoResponse.data);
    yield put({ type: 'SET_DETAILS', payload: { name: redskyResponse.data, price: mongoResponse.data[0].price, currencyCode: mongoResponse.data[0].currencyCode  } })
  }
  catch (error) {
    console.log(`Couldn't get details from redsky`);
  }
}

function* watcherSaga() {
  yield takeEvery('GET_DETAILS', getProductDetails);
};


/** -------- REDUCERS -------- **/
const productDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload;
    default:
      return state;
  }
};


// create store for redux and middleware
let storeInstance = createStore(
  combineReducers({
    productDetails
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={storeInstance}><App /></Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
