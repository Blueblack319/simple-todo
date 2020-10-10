import React, { useState } from "react";
import Button from "../../../../components/Button";

import classes from "./TodoItem.module.scss";

const TodoItem = (props) => {
  const [todoClass, setTodoClass] = useState(null);

  const handleClicked = () => {
    props.deleted(props.index);
  };

  const handleChecked = (event) => {
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
          <span role="img" aria-label="delete">
          ❌</span>
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
