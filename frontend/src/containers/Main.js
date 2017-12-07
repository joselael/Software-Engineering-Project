import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Signin from "./Signin";
import SearchProjects from "./SearchProjects"
import SearchUsers from "./SearchUsers"
import Signup from "./Signup";
import MyAccount from "./MyAccount";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/signin" component={Signin} />
      <Route path="/searchprojects" component={SearchProjects} />
      <Route path="/searchusers" component={SearchUsers} />
      <Route path="/signup" component={Signup} />
      <Route path="/myaccount" component={MyAccount} />
    </Switch>
  </main>
);

export default Main;
