import React from "react";
import classes from "./index.module.css";
const Modal = ({ children }) => {
  return (
    <div className={classes.modal_container}>
      <div className={classes.blur_modal}></div>
      {children}
    </div>
  );
};

export default Modal;
