import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Modal from "./components/Modal";
import Layout from "./hoc/Layout";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import CreateTodos from "./pages/CreateTodos";
import InputTodo from "./pages/InputTodo";
import ViewTodo from "./pages/ViewTodos"

import {connect} from "react-redux"
import * as actionCreators from "./store/actions";

function App({error}) {
  const errorInfo = error ? <Modal error={error} /> : null; 
  return (
    <div className="App">
      <Layout>
        {errorInfo}
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

const mapStateToProps = (state) => {
  return {
    error: state.todosReducer.error,
    userNames: state.todosReducer.userNames
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkToday: (userId, date) => dispatch(actionCreators.checkToday(userId, date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
