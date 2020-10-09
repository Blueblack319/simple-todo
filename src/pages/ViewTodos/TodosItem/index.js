import React from "react";
import Title from "../../../components/Title";

import classes from "./TodosItem.module.scss"

const TodosItem = () => {
    return <div className={classes.TodosItem}>
        <Title>2020-10-10</Title>
        <p>Busy</p>
        <p>Hoon has 10 Todos</p>
    </div>
}

export default TodosItem