import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter as Router } from "react-router-dom";

import {Provider} from "react-redux";
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import errorReducer from "./store/reducers/errorReducer";
import todosReducer from "./store/reducers/todosReducer";

const rootReducer = combineReducers({errorReducer, todosReducer})

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
