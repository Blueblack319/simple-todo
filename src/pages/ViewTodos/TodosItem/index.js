import React from "react";
import Title from "../../../components/Title";
import {withRouter} from "react-router-dom"

import classes from "./TodosItem.module.scss"

const TodosItem = (props) => {
    const {userName, date, count, id, history} = props

    const handleClicked = () => {
        history.push({
            pathname: "/input-todo",
            state: {
                id,
            }
        })
    }
    return <div className={classes.TodosItem} onClick={handleClicked}>
        <Title>{date}</Title>
        <p>{count >= 5 ? <span style={{color: "#d63031"}}>Busy Day!</span> : <span style={{color: "#00b894"}}>Free Day~</span>}</p>
        <p>{userName} has {count} Todos.</p>
    </div>
}

export default withRouter(TodosItem);