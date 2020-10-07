import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Title from "../../../components/Title/Title";

import classes from "./CreateTodosForm.module.scss";

const CreateTodosForm = (props) => {
  return (
    <div className={classes.CreateTodosForm}>
      <form>
        <Title>What's your name?</Title>
        <Input type="text" />
        <Title>When do you have to do?</Title>
        <Input type="date" />
        <Link to="input-todo">
          <Button>Go to Input Todos</Button>
        </Link>
      </form>
    </div>
  );
};

export default CreateTodosForm;
