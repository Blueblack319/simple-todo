import React, { useCallback, useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";

import classes from "./TodoList.module.scss";

const TodoList = (props) => {
  const [todoListClasses, setTodoListClasses] = useState([classes.TodoList]);

  const listRef = useRef(null);

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

  const setHeight = useCallback(() => {
    const { current } = listRef;
    if(todoListClasses.includes(classes.HeightLimit)){
      return
    }
    if (current.clientHeight > 80) {
      setTodoListClasses(todoListClasses.concat(classes.HeightLimit));
      console.log("Here");
    }
    console.log(current.clientHeight)
  }, [setTodoListClasses, todoListClasses]);

  useEffect(() => {
    setHeight()
  })

  console.log(todoListClasses);

  return (
    <div className={todoListClasses.join(" ")} ref={listRef}>
      {todos}
    </div>
  );
};

export default TodoList;
