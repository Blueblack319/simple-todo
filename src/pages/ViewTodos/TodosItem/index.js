import React from "react";
import Title from "../../../components/Title";

import classes from "./TodosItem.module.scss"

const TodosItem = (props) => {
    return <div className={classes.TodosItem}>
        <Title>{props.date}</Title>
        <p>{props.count >= 5 ? <span style={{color: "#d63031"}}>Busy Day!</span> : <span style={{color: "#00b894"}}>Free Day~</span>}</p>
        <p>{props.userName} has {props.count} Todos.</p>
    </div>
}

export default TodosItem