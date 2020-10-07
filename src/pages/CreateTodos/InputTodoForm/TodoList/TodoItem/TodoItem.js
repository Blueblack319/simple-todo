import React from "react";
import Button from "../../../../../components/Button/Button";

import classes from "./TodoItem.module.scss";

const TodoItem = (props) => {
  const handleClicked = () => {
    props.deleted(props.index);
  };

  return (
    <div className={classes.TodoItem}>
      <span>{props.todo}</span>
      <div className={classes.Controls}>
        <input type="checkbox" />
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
