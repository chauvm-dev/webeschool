import React from "react";
import { Route, Switch } from "react-router";
import Chat from "./pages/chat";
const Home = () => {
  return (
    <Switch>
      <Route path="/" component={Chat} />
    </Switch>
  );
};

export default Home;
