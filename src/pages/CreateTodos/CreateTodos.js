import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CreateTodosForm from "./CreateTodosForm/CreateTodosForm";
import Button from "../../components/Button/Button";

import classes from "./CreateTodos.module.scss";

const CreateTodos = (props) => {
  return (
    <div className={classes.CreateTodos}>
      <header>
        <Button>
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <Button>Auth</Button>
      </header>
      <div className={classes.Form}>
        <CreateTodosForm />
      </div>
    </div>
  );
};

export default CreateTodos;
