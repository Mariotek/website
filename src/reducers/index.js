import { combineReducers } from 'redux';

import csrf_token from './csrf_token';


// Start creating one reducer, and then jump into combining them
export const makeRootReducer = () =>
    combineReducers({
        /**
         * To get csrf token
         */
        csrf_token
    });
