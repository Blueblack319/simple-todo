import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./hoc/Layout";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import CreateTodos from "./pages/CreateTodos";
import InputTodo from "./pages/InputTodo";
import ViewTodo from "./pages/ViewTodos"

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={CreateTodos} />
          <Route path="/input-todo" component={InputTodo} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/view" component={ViewTodo} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
