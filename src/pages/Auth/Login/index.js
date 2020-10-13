import axios from "axios";
import React, { useReducer } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Title from "../../../components/Title";

import classes from "./Login.module.scss";

import { NavLink } from "react-router-dom";

import {connect} from "react-redux";
import actionTypes from "../../../store/actions/actionTypes";

const initialState = {
  email: "",
  password: "",
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.value };
    case "password":
      return { ...state, password: action.value };
    default:
      return state;
  }
};

const Login = ({errorOn, history}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password } = state;

  const handleValueUpdated = (event) => {
    dispatch({ type: event.target.name, value: event.target.value });
  };

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_FIREBASE_END_POINT}/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
      headers: { "Content-Type": "application/json" },
      data: {
        email: email,
        password,
      },
    })
      .then((res) => {
        localStorage.setItem("idToken", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
      })
      .then(history.push("/"))
      .catch((err) => errorOn(err.message));
  };

  const disabled = password === "" || email === "";

  return (
    <div className={classes.Login}>
      <form className={classes.Form} onSubmit={handleFormSubmitted}>
        <Title>Log In to Your Account!</Title>
        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          valueUpdated={handleValueUpdated}
          value={state.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          valueUpdated={handleValueUpdated}
          value={state.password}
        />
        <Button disabled={disabled}>Log In</Button>
      </form>
      <p>
        Need an Account?{" "}
        <NavLink to="/signup" className={classes.Link}>
          Sign up
        </NavLink>
      </p>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return{
    errorOn: (error) => dispatch({type: actionTypes.ON_ERROR, error}),
  }
}

export default connect(null, mapDispatchToProps)(Login);
