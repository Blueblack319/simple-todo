import React from "react";
import Button from "../../Button/Button";

import classes from "./TodoItem.module.scss";

const TodoItem = (props) => {
  return (
    <div className={classes.TodoItem}>
      <span>{props.todo}</span>
      <div className={classes.Controls}>
        <input type="checkbox" />
        <Button>
          <span style={{ fontSize: "20px" }} role="img" aria-label="delete">
            ❌
          </span>
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
