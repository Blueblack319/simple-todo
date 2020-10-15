import React from "react";
import { withRouter} from "react-router-dom";

import classes from "./TodosItem.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons"

import {connect} from "react-redux";
import * as actionCreators from "../../../store/actions";

const TodosItem = ({userName, date, count, id, history, reloaded, deleteTodos}) => {
    const handleClicked = () => {
        history.push({
            pathname: "/input-todo",
            state: {
                id,
            }
        })
    }

    const handleTodosRemoved = () => {
        deleteTodos(id, reloaded);
    }

    return <div className={classes.TodosItem}>
        <div className={classes.Container}><span>{date}</span><span className={classes.Icon} onClick={handleTodosRemoved}><FontAwesomeIcon icon={faTrashAlt} /></span></div>
        <p>{count >= 5 ? <span style={{color: "#d63031"}}>Busy Day!</span> : <span style={{color: "#00b894"}}>Free Day~</span>}</p>
        <div className={classes.Container}>{userName} has {count} Todos.<span className={classes.Icon} onClick={handleClicked}>VIEW</span></div>
    </div>
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodos: (id, reloaded) => dispatch(actionCreators.deleteTodos(id, reloaded))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(TodosItem));