import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signin, signup, signStart, signFailed } from "../../store/actions";
import Button from "../../UI/button";
import Input from "../../UI/input";
import InputWithEye from "../../UI/inputwitheye";
import Loading from "../../UI/loading";
import classes from "./index.module.css";

const Auth = ({ signUpRequired = false }) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(signUpRequired);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const [eye, setEye] = useState(false);
  const [eyeSignup, setEyeSignup] = useState(false);
  const onSubmitSignin = (data) => {
    dispatch(
      signin({
        username: data.username,
        password: data.password,
      })
    );
  };
  const onSubmitSignup = (data) => {
    dispatch(
      signup({
        username: data.usernameSignup,
        password: data.passwordSignup,
        profile: {
          displayName: data.name,
        },
      })
    );
  };
  const {
    register: registerSignin,
    errors: errorsSignin,
    handleSubmit: handleSubmitSignin,
  } = useForm({
    mode: "onBlur",
  });

  const {
    register: registerSignup,
    errors: errorsSignup,
    handleSubmit: handleSubmitSignup,
  } = useForm({
    mode: "onBlur",
  });

  // const handleLogoutGoogle = async (googleData) => {
  //   console.log(googleData);
  // };
  const handleLoginFacebook = () => {
    try {
      window.FB.login(function (response) {
        if (response.status === "connected") {
          // The user is logged in and has authenticated your
          // app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed
          // request, and the time the access token
          // and signed request each expire.
          dispatch(
            signin({
              socialType: "facebook",
              socialData: response.authResponse,
            })
          );
        } else if (response.status === "not_authorized") {
          // The user hasn't authorized your application.  They
          // must click the Login button, or you must call FB.login
          // in response to a user gesture, to launch a login dialog.
        } else {
          // The user isn't logged in to Facebook. You can launch a
          // login dialog with a user gesture, but the user may have
          // to log in to Facebook before authorizing your application.
        }
      });
    } catch (error) {
      dispatch(signFailed(error));
    }
  };
  const handleLoginGoogle = async () => {
    try {
      const user = await window.gapi.auth2.getAuthInstance().signIn();
      dispatch(
        signin({
          socialType: "google",
          socialData: user.qc,
        })
      );
    } catch (error) {
      dispatch(signFailed({ response: error.error }));
    }
    // window.gapi.auth2.getAuthInstance().signOut();
  };
  // const handleLoginGoogleSuccess = () => {
  //   try {
  //     if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
  //       dispatch(signStart());
  //       const user = window.gapi.auth2.getAuthInstance().currentUser.get();
  //     }
  //   } catch (error) {
  //     dispatch(signFailed());
  //   }
  // };

  return (
    <div className={classes.fragment}>
      <div
        className={
          isSignup
            ? [classes.container, classes.right_panel_active].join(" ")
            : classes.container
        }
        id="container"
      >
        <div
          className={[classes.form_container, classes.sign_up_container].join(
            " "
          )}
        >
          <form onSubmit={handleSubmitSignup(onSubmitSignup)}>
            <h1>Create Account</h1>
            <div className={classes.social_container}>
              <div href="#" className={classes.social}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
              </div>

              <div href="#" className={classes.social}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </div>
            </div>
            <span>or use your email for registration</span>

            <Input
              type="text"
              name="usernameSignup"
              placeholder="Email"
              register={registerSignup}
              validate={{
                required: true,
              }}
              errors={errorsSignup.usernameSignup}
            />
            <InputWithEye
              type={eyeSignup ? "text" : "password"}
              name="passwordSignup"
              placeholder="Passsword"
              register={registerSignup}
              validate={{
                required: true,
              }}
              errors={errorsSignup.passwordSignup}
              eye={eyeSignup}
              setEye={setEyeSignup}
            />
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              register={registerSignup}
              validate={{
                required: true,
              }}
              errors={errorsSignup.name}
            />
            <Button onClick={handleSubmitSignup(onSubmitSignup)}>
              Sign Up
            </Button>
          </form>
        </div>
        <div
          className={[classes.form_container, classes.sign_in_container].join(
            " "
          )}
        >
          <form onSubmit={handleSubmitSignin(onSubmitSignin)}>
            <h1>Sign in</h1>
            <div className={classes.social_container}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                  onClick={handleLoginGoogle}
                  disabled={loading}
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
              </div>
              <div onClick={handleLoginFacebook}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </div>
            </div>
            <span>or use your account</span>
            <Input
              type="text"
              name="username"
              placeholder="Email"
              register={registerSignin}
              validate={{
                required: true,
              }}
              errors={errorsSignin.username}
            />
            {/* * Passwords must be
             * - At least 8 characters long, max length anything
             * - Include at least 1 lowercase letter
             * - 1 capital letter
             * - 1 number
             * - 1 special character => !@#$%^&* */}
            <InputWithEye
              type={eye ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="on"
              register={registerSignin}
              validate={{
                required: true,
              }}
              errors={errorsSignin.password}
              eye={eye}
              setEye={setEye}
            />
            {/* <a href="#">Forgot your password?</a> */}
            <Button type="submit" onClick={handleSubmitSignin(onSubmitSignin)}>
              Sign In
            </Button>
          </form>
        </div>
        <div className={classes.overlay_container}>
          <div className={classes.overlay}>
            <div
              className={[classes.overlay_panel, classes.overlay_right].join(
                " "
              )}
              tabIndex="-1"
            >
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <Button light tabIndex clickedHandler={() => setIsSignup(true)}>
                <span>Sign Up</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </Button>
            </div>
            <div
              className={[classes.overlay_panel, classes.overlay_left].join(
                " "
              )}
              tabIndex="-1"
            >
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <Button light tabIndex clickedHandler={() => setIsSignup(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-left-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
                <span>Sign In</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Auth;
