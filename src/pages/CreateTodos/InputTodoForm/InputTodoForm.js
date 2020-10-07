import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Title from "../../../components/Title/Title";
import TodoList from "../../../components/TodoList/TodoList";
import useConstructor from "../../../hooks/useConstructor/useConstructor";

import classes from "./InputTodoForm.module.scss";

const InputTodoForm = (props) => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [index, setIndex] = useState(0);

  let todoUpdated = (event) => {
    setTodo(event.target.value);
  };

  useConstructor(() => {
    todoUpdated = todoUpdated.bind(this);
  });

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    setTodos(
      todos.concat({
        todo,
        index,
      })
    );
    setTodo("");
    setIndex((prevState) => prevState + 1);
  };

  return (
    <div className={classes.InputTodoForm}>
      <Title>
        Hi, Hoon! <br />
        You have 0 Todos <br />
        in 2020/10/6.
      </Title>
      <form className={classes.InputContainer} onSubmit={handleFormSubmitted}>
        <Input
          type="text"
          placeholder="Write your Todo"
          valueUpdated={todoUpdated}
          value={todo}
        />
        <Button>✔</Button>
      </form>
      <TodoList todos={todos} />
      <Button>Save</Button>
    </div>
  );
};

export default InputTodoForm;
