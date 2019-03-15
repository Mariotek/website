// React pre libraries
import React from 'react';
import ReactDOM from 'react-dom';


import { Provider } from 'react-redux';
import store from './store';


require('@babel/register');
require('@babel/polyfill');


import App from './Components/App';

// create csrf token and set it in store
// import { getToken } from './actions/csrf_token';
//
// store.dispatch(getToken());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.querySelector('#app')
);

module.hot.accept();
