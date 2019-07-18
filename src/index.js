import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Saga setup
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
const sagaMiddleware = createSagaMiddleware();

/** -------- SAGAS -------- **/


/** -------- REDUCERS -------- **/


// create store for redux and middleware
let storeInstance = createStore(
    combineReducers({
        productDetails
    }),
    applyMiddleware( sagaMiddleware, logger )
);

sagaMiddleware.run( waterSaga );

ReactDOM.render(
    <Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
