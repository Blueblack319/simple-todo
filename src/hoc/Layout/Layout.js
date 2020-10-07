import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";

import classes from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <header>
        <Button>
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <Button>Auth</Button>
      </header>
      <div className={classes.Form}>{props.children}</div>
    </div>
  );
};

export default Layout;
