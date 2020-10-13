import React, { useEffect, useState } from "react";
import TodosItem from "../TodosItem"
import axios from "../../../axios-todos"
import useConstructor from "../../../hooks/useConstructor"

import {connect} from "react-redux";
import actionTypes from "../../../store/actions/actionTypes";

const TodosList = ({errorOn}) => {
    const [todosListState, setTodosListState] = useState([])
    const [userId, setUserId] = useState("");
    const [reloadedCount, setReloadedCount] = useState(0);

    useConstructor(() => {
        setUserId(localStorage.getItem("userId"))
    })

    useEffect(() => {
        axios({
            method: "GET",
            url: `/todos-list.json?orderBy="userId"&equalTo="${userId}"`
        })
        // .then((res) => res.json)
        .then((resData) => {
            setTodosListState([])
            for (let key in resData.data){
                setTodosListState((prevState) => prevState.concat({
                    userName: resData.data[key].userName, 
                    date: resData.data[key].date, 
                    id: key, 
                    count: resData.data[key].todos ? resData.data[key].todos.length : 0
                }))
            }
        }).catch((err) => errorOn(err.message))
    }, [userId, reloadedCount, errorOn])

    const handleReloading = () => {
        setReloadedCount((prevState) => prevState + 1)
    }

    const todosList = todosListState ? todosListState.map((todosItem) => {
        return <TodosItem 
            userName={todosItem.userName}
            date={todosItem.date} 
            count={todosItem.count} 
            key={todosItem.id}
            id={todosItem.id}
            reloaded={handleReloading}
            />
    }) : null;
    return todosList
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        errorOn: (error) => dispatch({type: actionTypes.ON_ERROR, error})
    }
}

export default connect(null, mapDispatchToProps)(TodosList);