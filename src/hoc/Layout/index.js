import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";

import classes from "./Layout.module.scss";
import SideDrawer from "../../components/SideDrawer";
import Backdrop from "../../components/Backdrop";
import { NavLink } from "react-router-dom";

const Layout = (props) => {
  const [isSideDrawerShowed, setIsSideDrawerShowed] = useState(false);

  const handleSideDrawerShowed = () => {
    setIsSideDrawerShowed(true);
  };

  const handleSideDrawerClosed = () => {
    setIsSideDrawerShowed(false);
  };

  return (
    <Fragment>
      <SideDrawer
        isShowed={isSideDrawerShowed}
        closed={handleSideDrawerClosed}
      />
      <Backdrop isShowed={isSideDrawerShowed} closed={handleSideDrawerClosed} />
      <div className={classes.Layout}>
        <header>
          <Button clicked={handleSideDrawerShowed}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <NavLink to="/" className={classes.Link}>
            Simple Todo
          </NavLink>
        </header>
        <div className={classes.Form}>{props.children}</div>
      </div>
    </Fragment>
  );
};

export default Layout;
