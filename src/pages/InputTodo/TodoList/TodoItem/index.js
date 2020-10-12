import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";

import classes from "./TodoItem.module.scss";

const TodoItem = ({todo, index, deleted, checked, isChecked}) => {
  const [todoClass, setTodoClass] = useState(null);

  const handleClicked = () => {
    deleted(index);
  };

  const handleChecked = (event) => {
    let isChecked = false;
    if (event.target.checked) {
      isChecked = true;
    }
    checked(isChecked, index)
  };

  useEffect(() => {
    if(isChecked){
      setTodoClass(classes.TodoChecked);
    }else{
      setTodoClass(null);
    }
  }, [setTodoClass, isChecked])

  return (
    <div className={classes.TodoItem}>
      <span className={todoClass}>{todo}</span>
      <div className={classes.Controls}>
        <input type="checkbox" onChange={handleChecked} checked={isChecked}/>
        <Button clicked={handleClicked}>
          <span role="img" aria-label="delete">
          ❌</span>
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
