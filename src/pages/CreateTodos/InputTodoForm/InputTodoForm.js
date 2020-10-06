import React from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Title from "../../../components/Title/Title";
import TodoItem from "../../../components/TodoList/TodoItem/TodoItem";

import classes from "./InputTodoForm.module.scss";

const InputTodoForm = (props) => {
  return (
    <div className={classes.InputTodoForm}>
      <form>
        <Title>
          Hi, Hoon! <br />
          You have 0 Todos <br />
          in 2020/10/6.
        </Title>
        <form className={classes.InputContainer}>
          <Input type="text" placeholder="Write your Todo" />
          <Button>✔</Button>
        </form>
        <TodoItem />
        <Button>Save</Button>
      </form>
    </div>
  );
};

export default InputTodoForm;
