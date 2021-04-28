import React from "react";

import classes from "./index.module.css";

const Button = (props) => {
  return (
    <button
      className={props.light ? classes.light : classes.dark}
      onClick={props.clickedHandler}
      tabIndex={props.tabIndex ? "-1" : null}
    >
      {props.children}
    </button>
  );
};

export default Button;
