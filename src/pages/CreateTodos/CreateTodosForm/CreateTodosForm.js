import React from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Title from "../../../components/Title/Title";

import classes from "./CreateTodosForm.module.scss";

const CreateTodosForm = (props) => {
  return (
    <div className={classes.CreateTodosForm}>
      <form>
        <Title>What's your name?</Title>
        <Input />
        <Title>When do you have to do?</Title>
        <Input />
        <Button>Go to Input Todos</Button>
      </form>
    </div>
  );
};

export default CreateTodosForm;
