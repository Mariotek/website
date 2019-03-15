import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Waiting from './Waiting';

import Index from './site/Index';
// const About = lazy( () => import("./site/About") );
// const Faq = lazy( () => import("./site/Faq") );
// const Guide = lazy( () => import("./site/Guide") );
// const Rules = lazy( () => import("./site/Rules") );
// const Privacy = lazy( () => import("./site/Privacy") );
// const Panel = lazy( () => import("./Panel") );
// const NotFound = lazy( () => import("./404") );


function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Suspense fallback={ <Waiting /> }>
                    <Switch>
                        <Redirect from='/home' to='/'/>

                        <Route exact path='/' component={Index}/>
                        {/* <ScrollTopRoute path="/about" component={About}/>*/}
                        {/* <ScrollTopRoute path="/faq" component={Faq}/>*/}
                        {/* <ScrollTopRoute path="/guide" component={Guide}/>*/}
                        {/* <ScrollTopRoute path="/rules" component={Rules}/>*/}
                        {/* <ScrollTopRoute path="/privacy" component={Privacy}/>*/}

                        {/* <ScrollTopRoute path="/panel" component={Panel}/>*/}
                        {/* <ScrollTopRoute component={NotFound}/>*/}
                    </Switch>
                </Suspense>
            </React.Fragment>
        </BrowserRouter>
    );
}


export default App;
