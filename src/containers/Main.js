import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import PublicSearch from "./PublicSearch"
import Signup from "./Signup"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/publicsearch" component={PublicSearch} />
      <Route path="/Signup" component={Signup} />
    </Switch>
  </main>
);

export default Main;
