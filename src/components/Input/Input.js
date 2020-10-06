import React from "react";

import classes from "./Input.module.scss";

const Input = (props) => {
  return (
    <div>
      <input type="text" className={classes.Input} />
    </div>
  );
};

export default Input;
