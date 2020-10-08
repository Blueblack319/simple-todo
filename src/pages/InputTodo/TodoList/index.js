import React from "react";
import TodoItem from "./TodoItem";

import classes from "./TodoList.module.scss";

const TodoList = (props) => {
  const todos = props.todos.map((todoItem) => {
    return (
      <TodoItem
        todo={todoItem.todo}
        key={todoItem.index}
        index={todoItem.index}
        deleted={props.deleted}
      />
    );
  });
  return <div className={classes.TodoList}>{todos}</div>;
};

export default TodoList;
