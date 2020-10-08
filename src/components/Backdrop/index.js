import React from "react";

import classes from "./Backdrop.module.scss";

const Backdrop = (props) => {
  const backdropClasses = [classes.Backdrop];
  if (props.isShowed) {
    backdropClasses.push(classes.Visible);
  }
  return (
    <div className={backdropClasses.join(" ")} onClick={props.closed}></div>
  );
};

export default Backdrop;
