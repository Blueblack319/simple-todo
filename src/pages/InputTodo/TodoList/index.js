import React, {  useCallback, useEffect, useState } from "react";
import TodoItem from "./TodoItem";

import classes from "./TodoList.module.scss";

const TodoList = ({todoList, deleted, isInputFocused, checked}) => {
  const [todoListClasses, setTodoListClasses] = useState([classes.TodoList]);

  const setHeight = useCallback(() => {
    if(isInputFocused){
      setTodoListClasses(todoListClasses.concat(classes.HeightLimit));
    }
    if(todoListClasses.includes(classes.HeightLimit)){
      setTodoListClasses(todoListClasses.filter((todoListClass) => todoListClass !== classes.HeightLimit));
    }
  }, [isInputFocused, todoListClasses]);

  useEffect(() => {
    setHeight()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInputFocused])

  const todos = todoList ? todoList.map((todoItem) => {
    return (
      <TodoItem
        todo={todoItem.todo}
        key={todoItem.index}
        index={todoItem.index}
        isChecked={todoItem.isChecked}
        deleted={deleted}
        checked={checked}
      />
    );
  }) : null;

  return (
    <div className={todoListClasses.join(" ")}>
      {todos.reverse()}
    </div>
  );
};

export default TodoList;
