import React, { useReducer } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Title from "../../../components/Title";
import axios from "axios";

import classes from "./SignUp.module.scss";

const initialState = {
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.value };
    case "passwordOne":
      return { ...state, passwordOne: action.value };
    case "passwordTwo":
      return { ...state, passwordTwo: action.value };
    case "error":
      return { ...state, error: action.value };
    default:
      return state;
  }
};

const SignUp = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, passwordOne, passwordTwo, error } = state;

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
      .then(props.history.push("/"))
      .catch((err) => dispatch({ type: "error", value: err }));
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
      {error && <p style={{ color: "#e74c3c" }}>{error.message}</p>}
    </form>
  );
};

export default SignUp;
