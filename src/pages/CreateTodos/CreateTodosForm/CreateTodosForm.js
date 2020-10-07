import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Title from "../../../components/Title/Title";

import classes from "./CreateTodosForm.module.scss";

const CreateTodosForm = (props) => {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    localStorage.setItem("userName", userName);
    localStorage.setItem("date", date);
    props.history.push("/input-todo");
  };

  const handleValueUpdated = (event) => {
    const { name, value } = event.target;
    if (name === "userName") {
      setUserName(value);
    } else {
      setDate(value);
    }
  };

  return (
    <div className={classes.CreateTodosForm}>
      <form onSubmit={handleFormSubmitted}>
        <Title>What's your name?</Title>
        <Input
          type="text"
          valueUpdated={handleValueUpdated}
          name="userName"
          value={userName}
        />
        <Title>When do you have to do?</Title>
        <Input
          type="date"
          valueUpdated={handleValueUpdated}
          name="date"
          value={date}
        />
        <Button>Go to Input Todos</Button>
      </form>
    </div>
  );
};

export default CreateTodosForm;
