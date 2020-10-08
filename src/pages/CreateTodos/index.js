import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Title from "../../components/Title";

import classes from "./CreateTodos.module.scss";

const CreateTodosForm = (props) => {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  // const [idToken, setIdToken] = useState(null);

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    const storedIdToken = localStorage.getItem("idToken");
    // await setIdToken(storedIdToken);
    // console.log(storedIdToken);
    // console.log(idToken); Q.왜 idToken state에 저장이 되기 전에 실행 될까? => async 비동기로 처리할 수 있나?
    if (storedIdToken) {
      localStorage.setItem("userName", userName);
      localStorage.setItem("date", date);
      props.history.push("/input-todo");
    } else {
      props.history.push("/login");
    }
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
        <Button>Go to Input Todo</Button>
      </form>
    </div>
  );
};

export default CreateTodosForm;
