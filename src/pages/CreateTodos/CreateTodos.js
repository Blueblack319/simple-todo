import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CreateTodosForm from "./CreateTodosForm/CreateTodosForm";
import Button from "../../components/Button/Button";
import InputTodoForm from "./InputTodoForm/InputTodoForm";

import classes from "./CreateTodos.module.scss";

import { Switch, Route } from "react-router-dom";

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
        <Switch>
          <Route path="/input-todo" component={InputTodoForm} />
          <Route path="/" component={CreateTodosForm} />
        </Switch>
      </div>
    </div>
  );
};

export default CreateTodos;
