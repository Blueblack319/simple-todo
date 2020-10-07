import React from "react";
import TodoItem from "./TodoItem/TodoItem";

const TodoList = (props) => {
  const todos = props.todos.map((todoItem) => {
    return <TodoItem todo={todoItem.todo} key={todoItem.index} />;
  });
  return todos;
};

export default TodoList;
