import React, { useState, Fragment } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Title from "../../components/Title";

import classes from "./CreateTodos.module.scss";

import {connect} from "react-redux";
import * as actionCreators from "../../store/actions"
import Modal from "../../components/Modal";
import useConstructor from "../../hooks/useConstructor";

const CreateTodosForm = ({checkToday, userNames, history, isAlamChecked}) => {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  // const [idToken, setIdToken] = useState(null);

  useConstructor(() => {
    if (!isAlamChecked){
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
      checkToday(localStorage.getItem("userId"), formattedDate)
    }else{
      return
    }
  })
  

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    const storedIdToken = localStorage.getItem("idToken");
    // await setIdToken(storedIdToken);
    // console.log(storedIdToken);
    // console.log(idToken); Q.왜 idToken state에 저장이 되기 전에 실행 될까? => async 비동기로 처리할 수 있나?
    if (storedIdToken) {
      localStorage.setItem("userName", userName);
      localStorage.setItem("date", date);
      history.push("/input-todo");
    } else {
      history.push("/login");
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

  const alam = userNames ? <Modal userNames={userNames} /> : null;

  return (
    <Fragment>
      {alam}
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
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userNames: state.todosReducer.userNames,
    isAlamChecked: state.todosReducer.isAlamChecked
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    checkToday: (userId, date) => dispatch(actionCreators.checkToday(userId, date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodosForm);
