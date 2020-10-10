import React, { useEffect, useState } from "react";
import TodosItem from "../TodosItem"
import axios from "../../../axios-todos"
import useConstructor from "../../../hooks/useConstructor"

const TodosList = (props) => {
    const [todosListState, setTodosListState] = useState([])
    const [userId, setUserId] = useState("");

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
            console.log(resData.data)
            for (let key in resData.data){
                setTodosListState((prevState) => prevState.concat({
                    userName: resData.data[key].userName, 
                    date: resData.data[key].date, 
                    id: key, 
                    count: resData.data[key].todos.length
                }))
            }
        })
    }, [])

    const todosList = todosListState.map((todosItem) => {
        return <TodosItem 
            userName={todosItem.userName}
            date={todosItem.date} 
            count={todosItem.count} 
            key={todosItem.id}
            id={todosItem.id}
            />
    })
    return todosList
    
}

export default TodosList;