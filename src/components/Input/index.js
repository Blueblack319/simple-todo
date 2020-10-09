import React from "react";

import classes from "./Input.module.scss";

const Input = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className={classes.Input}
      onChange={props.valueUpdated}
      value={props.value}
      name={props.name}
      onFocus={props.inputFocused}
      onBlur={props.inputBlured}
    />
  );
};

export default Input;
