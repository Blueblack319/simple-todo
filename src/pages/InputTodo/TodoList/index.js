import React, {  useCallback, useEffect, useState } from "react";
import TodoItem from "./TodoItem";

import classes from "./TodoList.module.scss";

const TodoList = (props) => {
  const [todoListClasses, setTodoListClasses] = useState([classes.TodoList]);
  const {todoList, deleted, isInputFocused} = props;

  // const listRef = useRef(null);

  const todos = todoList.map((todoItem) => {
    return (
      <TodoItem
        todo={todoItem.todo}
        key={todoItem.index}
        index={todoItem.index}
        deleted={deleted}
      />
    );
  });

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

  return (
    <div className={todoListClasses.join(" ")}>
      {todos}
    </div>
  );
};

export default TodoList;
