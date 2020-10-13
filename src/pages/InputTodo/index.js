import React, { useCallback, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Title from "../../components/Title";
import TodoList from "./TodoList";
import useConstructor from "../../hooks/useConstructor";
import axios from "../../axios-todos"

import classes from "./InputTodo.module.scss";

import {connect} from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

const InputTodoForm = (props) => {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState(null);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [index, setIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [idToken, setIdToken] = useState("");
  const [userId, setUserId] = useState("");

  useConstructor(() => {
    if(props.location.state){
      const {id} = props.location.state;
      axios({
        method: "GET",
        url: `/todos-list.json?orderBy="$key"&equalTo="${id}"`,
      }).then((res) => res.data[id])
      .then((res) => {
        setUserName(res.userName);
        setDate(res.date);
        setTodos(res.todos ? res.todos : [])
      })
      .catch(err => props.errorOn(err.message))
    }else{
      setUserName(localStorage.getItem("userName"));
      setDate(localStorage.getItem("date"));
    }
    setIdToken(localStorage.getItem("idToken"));
    setUserId(localStorage.getItem("userId"));
  }) 

  const handleTodoUpdated = (event) => {
    setTodo(event.target.value);
  }

  const handleTodoDeleted = (index) => {
    setTodos(todos.filter((todoItem) => todoItem.index !== index));
  };

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    setIndex(new Date());
    setTodos(
      todos.concat({
        todo,
        index,
        isChecked: false
      })
    );
    setTodo("");
  };

  const handleTodosSaved = () => {
    if(props.location.state){
      const {id} = props.location.state;
      axios({
        method: "PATCH",
        url: `/todos-list/${id}.json`,
        data: {
          todos,
          date,
          userName,
          idToken,
          userId,
        }
      }).then((res) => props.history.push("/view"))
      .catch(err => props.errorOn(err.message))
    }else{
      axios({
        method: "POST",
        url: "/todos-list.json",
        data: {
          todos,
          date,
          userName,
          idToken,
          userId,
        }
      }).then((res) => props.history.push("/view"))
      .catch(err => props.errorOn(err.message))
    }
  }

  const handleInputFocused = () => {
    setIsFocused(true);
  }

  const handleInputBlured = () => {
    setIsFocused(false)
  }

  const handleTodoChecked = useCallback((isChecked, index) => {
      setTodos((prevState) => prevState.map((todoItem) => {
        if(todoItem.index === index){
          todoItem.isChecked = isChecked
        }
        return todoItem;
      }))
  }, [setTodos])

  return (
    <div className={classes.InputTodoForm}>
      <Title>
        Hi, {userName}! <br />
        You have {todos ? todos.length : 0} Todos <br />
        in {date}.
      </Title>
      <form className={classes.InputContainer} onSubmit={handleFormSubmitted}>
        <Input
          type="text"
          placeholder="Write your Todo"
          valueUpdated={handleTodoUpdated}
          value={todo}
          inputFocused={handleInputFocused}
          inputBlured={handleInputBlured}
        />
        <Button>
          <span style={{ color: "#00b894" }}>✔</span>
        </Button>
      </form>
      <TodoList 
        todoList={todos} 
        deleted={handleTodoDeleted} 
        isInputFocused={isFocused} 
        checked={handleTodoChecked}
      />
      <Button clicked={handleTodosSaved}>{props.location.state ? "Edit" : "Save"}</Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    errorOn: (error) => dispatch({type: actionTypes.ON_ERROR, error})
  }
}

export default connect(null, mapDispatchToProps)(InputTodoForm);
