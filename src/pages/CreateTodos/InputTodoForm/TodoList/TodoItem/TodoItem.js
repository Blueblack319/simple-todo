import React, { useState } from "react";
import Button from "../../../../../components/Button/Button";

import classes from "./TodoItem.module.scss";

const TodoItem = (props) => {
  const [todoClass, setTodoClass] = useState(null);

  const handleClicked = () => {
    props.deleted(props.index);
  };

  const handleChecked = (event) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      setTodoClass(classes.Todo);
    } else {
      setTodoClass(null);
    }
  };

  return (
    <div className={classes.TodoItem}>
      <span className={todoClass}>{props.todo}</span>
      <div className={classes.Controls}>
        <input type="checkbox" onClick={handleChecked} />
        <Button clicked={handleClicked}>
          <span style={{ fontSize: "20px" }} role="img" aria-label="delete">
            ❌
          </span>
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
