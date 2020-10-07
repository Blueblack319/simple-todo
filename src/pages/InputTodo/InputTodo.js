import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import TodoList from "./TodoList/TodoList";
import useConstructor from "../../hooks/useConstructor/useConstructor";

import classes from "./InputTodo.module.scss";

const InputTodoForm = (props) => {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState(null);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    setDate(localStorage.getItem("date"));
  }, []);

  let todoUpdated = (event) => {
    setTodo(event.target.value);
  };

  const handleTodoDeleted = (index) => {
    setTodos(todos.filter((todoItem) => todoItem.index !== index));
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
        Hi, {userName}! <br />
        You have {todos.length} Todos <br />
        in {date}.
      </Title>
      <form className={classes.InputContainer} onSubmit={handleFormSubmitted}>
        <Input
          type="text"
          placeholder="Write your Todo"
          valueUpdated={todoUpdated}
          value={todo}
        />
        <Button>
          <span style={{ color: "#00b894" }}>✔</span>
        </Button>
      </form>
      <TodoList todos={todos} deleted={handleTodoDeleted} />
      <Button>Save</Button>
    </div>
  );
};

export default InputTodoForm;
