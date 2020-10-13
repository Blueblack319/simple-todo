import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";

import classes from "./SideDrawer.module.scss";

const SideDrawer = ({isShowed, closed}) => {
  let isAuth = false;
  const sideDrawerClasses = [classes.SideDrawer];

  if (isShowed) {
    sideDrawerClasses.push(classes.Visible);
  }

  if(localStorage.getItem("idToken")){
    isAuth = true
  }else{
    isAuth = false
  }

  const handleLogout = () => {
    localStorage.clear()
    closed()
  }

  return (
    <div className={sideDrawerClasses.join(" ")}>
      <Button clicked={closed}>Simple Todo</Button>
      <nav className={classes.Links}>
        <NavLink to="/" onClick={closed} className={classes.Link}>
          Create Todos
        </NavLink>
        {isAuth ? <div onClick={handleLogout} className={classes.Link}>Logout</div> : <NavLink to="/login" onClick={closed} className={classes.Link}>Login</NavLink>}
        <NavLink to="/view" onClick={closed} className={classes.Link}>
          View Todos
        </NavLink>
      </nav>
    </div>
  );
};

export default SideDrawer;