import React from "react";

import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <div>
      <button className={classes.Button}>{props.children}</button>
    </div>
  );
};

export default Button;
