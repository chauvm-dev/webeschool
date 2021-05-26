import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "./UI/loading";
import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "./store/actions";
const App = () => {
  const dispatch = useDispatch();
  const Auth = lazy(() => import("./features/auth"));
  const Home = lazy(() => import("./features/home"));
  const userID = useSelector((state) => state.user._id);
  const loading = useSelector((state) => state.user.loading);

  const loadGoogleLoginApi = () => {
    const callback = () =>
      window.gapi.client
        .init({
          apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: "https://www.googleapis.com/auth/userinfo.email",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          ],
        })
        .then(function () {
          // GoogleAuth = window.gapi.auth2.getAuthInstance();
          // Listen for sign-in state changes.
          // const user = window.gapi.auth2.getAuthInstance().currentUser.get();
          // if (user) {
          // dispatch(
          //   signin({
          //     socialType: "google",
          //     socialData: user.qc,
          //   })
          // );
          // console.log(user);
          // }
          // window.gapi.auth2
          //   .getAuthInstance()
          //   .currentUser.listen(handleLoginGoogleSuccess);
          // Handle initial sign-in state. (Determine if user is already signed in.)
          // setSigninStatus();
        });
    // Loads the JavaScript client library and invokes `start` afterwards.
    window.gapi.load("client", callback);
  };
  const loadFbLoginApi = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_ID,
        cookie: true,
        xfbml: true,
        version: "v10.0",
      });

      window.FB.AppEvents.logPageView();
      // window.FB.getLoginStatus(function (response) {
      //this will be called when the roundtrip to Facebook has completed
      // console.log(response);
      // if (response.status === "connected") {
      //   dispatch(
      //     signin({
      //       socialType: "facebook",
      //       socialData: response.authResponse,
      //     })
      //   );
      // }
      // window.FB.logout(function (response) {
      //   // Person is now logged out
      //   console.log(response);
      // });
      // }, true);
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  useEffect(() => {
    loadFbLoginApi();
    loadGoogleLoginApi();
  }, []);
  useEffect(() => {
    dispatch(signin());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      {(loading && !userID && <Loading />) || (
        <>
          {(!userID && (
            <Switch>
              <Route path="/auth" component={Auth} />
              <Redirect from="/" to="/auth" component={Auth} />
            </Switch>
          )) || (
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          )}
        </>
      )}
    </Suspense>
  );
};

export default App;
