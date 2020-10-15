import React, { useEffect, useState } from "react";
import TodosItem from "../TodosItem"

import {connect} from "react-redux";
import * as actionCreators from "../../../store/actions";

const TodosList = ({todosList, loadTodosList}) => {
    const [reloading, setReloading] = useState(0);

    useEffect(() => {
        loadTodosList(localStorage.getItem("userId"))
    }, [reloading, loadTodosList])

    const handleReloading = () => {
        setReloading((prevState) => prevState + 1)
    } 

    const todos = todosList ? todosList.map((todosItem) => {
        return <TodosItem 
            userName={todosItem.userName}
            date={todosItem.date} 
            count={todosItem.count} 
            key={todosItem.id}
            id={todosItem.id}
            reloaded={() => setReloading(handleReloading)}
            />
    }) : null;
    return todos
    
}

const mapStateToProps = (state) => {
    return {
        todosList: state.todosReducer.todosList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTodosList: (userId) => dispatch(actionCreators.loadTodosList(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosList);