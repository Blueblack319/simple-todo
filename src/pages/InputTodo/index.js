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
  const [isFocused, setIsFocused] = useState(false);

  let todoUpdated = (event) => {
    setTodo(event.target.value);
  };

  useConstructor(() => {
    todoUpdated = todoUpdated.bind(this);
    if(props.location.state){
      axios({
        method: "GET",
        url: `/todos-list.json?orderBy="$key"&equalTo="${props.location.state.id}"`,
      }).then((res) => res.data[props.location.state.id])
      .then((res) => {
        setUserName(res.userName);
        setDate(res.date);
        setTodos(res.todos)
        setIndex(res.todos.length)
      })
      .catch(err => setError(err))
    }else{
      setUserName(localStorage.getItem("userName"));
      setDate(localStorage.getItem("date"));
    }
  }) 

  useEffect(() => {
    console.log(isFocused)
  }, [isFocused])

  const handleTodoDeleted = (index) => {
    setTodos(todos.filter((todoItem) => todoItem.index !== index));
  };

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

  const handleInputFocused = () => {
    setIsFocused(true);
  }

  const handleInputBlured = () => {
    setIsFocused(false)
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
          inputFocused={handleInputFocused}
          inputBlured={handleInputBlured}
        />
        <Button>
          <span style={{ color: "#00b894" }}>✔</span>
        </Button>
      </form>
      <TodoList todoList={todos} deleted={handleTodoDeleted} isInputFocused={isFocused}/>
      <Button clicked={handleTodosSaved}>Save</Button>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default InputTodoForm;
