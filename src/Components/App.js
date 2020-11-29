import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Waiting from './Waiting';

import Index from './site/Index';
const About = lazy(() => import('./About'));
const Faq = lazy(() => import('./Faq'));
const Success = lazy(() => import('./Success'));
const NotFound = lazy(() => import('./404'));


const App = () => (
    <HashRouter>
        <React.Fragment>
            <Suspense fallback={ <Waiting /> }>
                <Switch>
                    <Redirect from='/home' to='/'/>
                    <Route exact path='/' component={Index}/>
                    <Route path='/about' component={About}/>
                    <Route path='/faq' component={Faq}/>
                    <Route path='/success' component={Success}/>
                    <Route component={NotFound}/>
                </Switch>
            </Suspense>
        </React.Fragment>
    </HashRouter>
);


export default App;
