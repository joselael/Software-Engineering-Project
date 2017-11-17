import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import PublicSearch from "./PublicSearch"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/publicsearch" component={PublicSearch} />
    </Switch>
  </main>
);

export default Main;
