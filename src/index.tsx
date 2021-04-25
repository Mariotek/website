import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import "./globals";

import Loading from "./components/loading";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Faq = lazy(() => import("./pages/Faq"));
const Success = lazy(() => import("./pages/Order/Success"));
const Failure = lazy(() => import("./pages/Order/Failure"));
const NotFound = lazy(() => import("./pages/404"));

const App = () => (
  <HashRouter>
    <React.Fragment>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Redirect from="/home" to="/" />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/faq" component={Faq} />
          <Route path="/success" component={Success} />
          <Route path="/failure" component={Failure} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </React.Fragment>
  </HashRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
