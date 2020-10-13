import React from "react";
import { withRouter} from "react-router-dom";
import axios from "../../../axios-todos";

import classes from "./TodosItem.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons"

import {connect} from "react-redux";
import actionTypes from "../../../store/actions/actionTypes";

const TodosItem = ({userName, date, count, id, history, reloaded, errorOn}) => {
    const handleClicked = () => {
        history.push({
            pathname: "/input-todo",
            state: {
                id,
            }
        })
    }

    const handleTodosRemoved = () => {
        axios({
            method: "DELETE",
            url: `/todos-list/${id}.json`,
        })
        .then((res) => {
            reloaded()
        })
        .catch((err) => errorOn(err.message))
    }

    return <div className={classes.TodosItem}>
        <div className={classes.Container}><span>{date}</span><span className={classes.Icon} onClick={handleTodosRemoved}><FontAwesomeIcon icon={faTrashAlt} /></span></div>
        <p>{count >= 5 ? <span style={{color: "#d63031"}}>Busy Day!</span> : <span style={{color: "#00b894"}}>Free Day~</span>}</p>
        <div className={classes.Container}>{userName} has {count} Todos.<span className={classes.Icon} onClick={handleClicked}>VIEW</span></div>
    </div>
}

const mapDispatchToProps = (dispatch) => {
    return {
        errorOn: (error) => dispatch({type: actionTypes.ON_ERROR, error})
    }
}

export default withRouter(connect(null, mapDispatchToProps)(TodosItem));