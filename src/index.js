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
// sends http request to redsky for name, sends http request to database for price, combines both into single object to send back to set reducer for client
function* getProductDetails(action) {
  try {
    const redskyResponse = yield axios.get(`/details/name/${action.payload}`)
    const mongoResponse = yield axios.get(`/details/price/${action.payload}`)
    console.log(`price is`, mongoResponse.data);
    yield put({ type: 'SET_DETAILS', payload: { id: mongoResponse.data[0].productId, name: redskyResponse.data, price: mongoResponse.data[0].price, currencyCode: mongoResponse.data[0].currencyCode } })
  }
  catch (error) {
    console.log(`Couldn't get details from redsky`);
    alert(`Sorry, couldn't get your product details.  Try again later.`)
  }
}

// sends http request to update price in database using product id
function* updateProductPrice(action) {
  try {
    yield axios.put(`/details/price`, action.payload)
  }
  catch (error) {
    console.log(`Error updating product price in database`, error);
    alert(`Sorry, couldn't update your price. Try again later.`)
  }
}

// watcheds for actions to trigger generator functions
function* watcherSaga() {
  yield takeEvery('GET_DETAILS', getProductDetails);
  yield takeEvery('UPDATE_PRICE', updateProductPrice)
};

/** -------- REDUCERS -------- **/
// reducer to hold all product details for access on client side
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
