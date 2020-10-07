import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import CreateTodos from "./pages/CreateTodos/CreateTodos";
import InputTodo from "./pages/InputTodo/InputTodo";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={CreateTodos} />
          <Route path="/input-todo" component={InputTodo} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
