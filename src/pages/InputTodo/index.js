import React, { useState } from "react";
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
  const [idToken, setIdToken] = useState("");
  const [userId, setUserId] = useState("");
  const { id, isEdited } = props.location.state

  let todoUpdated = (event) => {
    setTodo(event.target.value);
  };

  useConstructor(() => {
    todoUpdated = todoUpdated.bind(this);
    if(id){
      axios({
        method: "GET",
        url: `/todos-list.json?orderBy="$key"&equalTo="${id}"`,
      }).then((res) => res.data[id])
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
    setIdToken(localStorage.getItem("idToken"));
    setUserId(localStorage.getItem("userId"));
  }) 

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
    if(isEdited){
      axios({
        method: "PATCH",
        url: `/todos-list/${id}.json`,
        data: {
          todos,
          date,
          userName,
          idToken,
          userId
        }
      }).then((res) => props.history.push("/view"))
      .catch((err) => setError(err))
    }else{
      axios({
        method: "POST",
        url: "/todos-list.json",
        data: {
          todos,
          date,
          userName,
          idToken,
          userId
        }
      }).then((res) => props.history.push("/view"))
      .catch((err) => setError(err))
    }
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
      <Button clicked={handleTodosSaved}>{isEdited ? "Edit" : "Save"}</Button>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default InputTodoForm;
