import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";

import classes from "./SideDrawer.module.scss";

const SideDrawer = (props) => {
  const sideDrawerClasses = [classes.SideDrawer];
  if (props.isShowed) {
    sideDrawerClasses.push(classes.Visible);
  }

  return (
    <div className={sideDrawerClasses.join(" ")}>
      <Button clicked={props.closed}>Simple Todo</Button>
      <nav className={classes.Links}>
        <NavLink to="/">
          <Button clicked={props.closed}>Create</Button>
        </NavLink>
        <NavLink to="/login">
          <Button clicked={props.closed}>Login</Button>
        </NavLink>
        <NavLink to="/">
          <Button clicked={props.closed}>View Todos</Button>
        </NavLink>
      </nav>
    </div>
  );
};

export default SideDrawer;
