import React from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Title from "../../../components/Title/Title";

import classes from "./Login.module.scss";

const Login = () => {
  return (
    <form className={classes.Login}>
      <Title>Log In to Your Account</Title>
      <Input type="email" placeholder="User ID" />
      <Input type="password" placeholder="Password" />
      <Button>Log In</Button>
    </form>
  );
};

export default Login;
