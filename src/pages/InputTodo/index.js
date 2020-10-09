import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Title from "../../components/Title";
import TodoList from "./TodoList";
import useConstructor from "../../hooks/useConstructor";
import axios from "../../axios-todos"

import classes from "./InputTodo.module.scss";

const InputTodoForm = (props) => {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState(null);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(null);

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

  const handleTodosSaved = () => {
    axios({
      method: "POST",
      url: "/todos-list.json",
      data: {
        todos,
        date,
        userName,
      }
    }).then((res) => props.history.push("/view"))
    .catch((err) => setError(err))
  }

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
      <Button clicked={handleTodosSaved}>Save</Button>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default InputTodoForm;
