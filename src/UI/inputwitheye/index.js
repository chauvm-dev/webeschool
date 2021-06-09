import React from "react";
import Assets from "../../assets";
import classes from "./index.module.css";
const InputWithEye = ({
  type,
  name,
  placeholder,
  register,
  validate,
  errors,
  eye,
  setEye,
}) => {
  return (
    <div className={classes.Container}>
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
      {(eye && (
        <img
          className={[classes.Img, classes.showeye].join(" ")}
          src={Assets.vision_svg}
          alt={"Show eyes"}
          onClick={() => setEye(false)}
        />
      )) || (
        <img
          className={[classes.Img, classes.hideeye].join(" ")}
          src={Assets.private_svg}
          alt={"Hide eyes"}
          onClick={() => setEye(true)}
        />
      )}
    </div>
  );
};

export default InputWithEye;
