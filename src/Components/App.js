import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Waiting from './Waiting';

import Index from './site/Index';
const About = lazy(() => import('./About'));
const Faq = lazy(() => import('./Faq'));
const NotFound = lazy(() => import('./404'));


const App = () => (
    <BrowserRouter>
        <React.Fragment>
            <Suspense fallback={ <Waiting /> }>
                <Switch>
                    <Redirect from='/home' to='/'/>
                    <Route exact path='/' component={Index}/>
                    <Route path='/about' component={About}/>
                    <Route path='/faq' component={Faq}/>
                    <Route component={NotFound}/>
                </Switch>
            </Suspense>
        </React.Fragment>
    </BrowserRouter>
);


export default App;
