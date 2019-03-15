/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { makeRootReducer } from '../reducers/index';
import requests from './requests';

const middleware = [thunk, requests];

// if (process.env['NODE_ENV'] !== 'production') {
const { createLogger } = require('redux-logger');
middleware.push(createLogger({ collapsed: true, diff: true }));
// }

const enhancer = compose(
    applyMiddleware(...middleware),
    persistState([
        'csrf_token',
        'loginAndRegister',
        'karriz_get'
    ]),
);

// Store Instantiation and HMR Setup
const rootReducer = makeRootReducer();
const store = createStore(rootReducer, enhancer);


export default store;
