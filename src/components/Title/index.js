import React from "react";

import classes from "./Title.module.scss";

const Title = (props) => {
  return <div className={classes.Title}>{props.children}</div>;
};

export default Title;
