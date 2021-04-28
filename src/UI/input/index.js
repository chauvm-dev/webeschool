import React from "react";
import classes from "./index.module.css";
const Input = ({ type, name, placeholder, register, validate, errors }) => {
  return (
    <input
      className={
        errors
          ? [classes.Input, classes.Error].join(" ")
          : [classes.Input, classes.Success].join(" ")
      }
      type={type}
      name={name}
      placeholder={placeholder}
      ref={register(validate)}
    />
  );
};

export default Input;
