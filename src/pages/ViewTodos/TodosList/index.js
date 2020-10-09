import React, { useEffect, useState } from "react";
import TodosItem from "../TodosItem"
import axios from "../../../axios-todos"

const TodosList = (props) => {
    const [todosListState, setTodosListState] = useState([])
    useEffect(() => {
        axios({
            method: "GET",
            url: "/todos-list.json"
        }).then((res) => {
            for (let key in res.data){
                setTodosListState((prevState) => prevState.concat({
                    userName: res.data[key].userName, 
                    date: res.data[key].date, 
                    id: key, 
                    count: res.data[key].todos.length
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