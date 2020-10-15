import React, { useReducer } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Title from "../../../components/Title";
import axios from "axios";

import classes from "./SignUp.module.scss";

import {connect} from "react-redux";
import * as actionCreators from "../../../store/actions";

const initialState = {
  email: "",
  passwordOne: "",
  passwordTwo: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.value };
    case "passwordOne":
      return { ...state, passwordOne: action.value };
    case "passwordTwo":
      return { ...state, passwordTwo: action.value };
    default:
      return state;
  }
};

const SignUp = ({history, errorOn}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, passwordOne, passwordTwo } = state;

  const handleValueUpdated = (event) => {
    dispatch({ type: event.target.name, value: event.target.value });
  };

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_FIREBASE_END_POINT}/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
      headers: { "Content-Type": "application/json" },
      data: {
        email: email,
        password: passwordOne,
      },
    })
      .then((res) => {
        localStorage.setItem("idToken", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
      })
      .then(history.push("/"))
      .catch((err) => errorOn(err.message));
  };

  const disabled =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    passwordTwo === "" ||
    email === "";

  return (
    <form className={classes.SignUp} onSubmit={handleFormSubmitted}>
      <Title>Create Your Account!</Title>
      <Input
        type="email"
        name="email"
        valueUpdated={handleValueUpdated}
        value={email}
        placeholder="Email Address"
      />
      <Input
        type="password"
        name="passwordOne"
        valueUpdated={handleValueUpdated}
        value={passwordOne}
        placeholder="Password"
      />
      <Input
        type="password"
        name="passwordTwo"
        valueUpdated={handleValueUpdated}
        value={passwordTwo}
        placeholder="Confirm Password"
      />
      <Button disabled={disabled}>Sign Up</Button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    errorOn: (error) => dispatch(actionCreators(error)),
  }
}

export default connect(null, mapDispatchToProps)(SignUp);
