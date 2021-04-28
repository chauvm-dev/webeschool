import { Switch, Route } from "react-router-dom";
import Loading from "./UI/loading";
import React, { Suspense, lazy } from "react";
import Home from "./features/home";
function App() {
  const Auth = lazy(() => import("./features/auth"));
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Home} />
      </Switch>
    </Suspense>
  );
}

export default App;
