import React, { useRef } from "react";
import TodosList from "./TodosList";

import classes from "./ViewTodos.module.scss";

const ViewTodos = () => {
    const ViewTodosRef = useRef(null);
    const ViewTodosClasses = [classes.ViewTodos]

    // useEffect(() => {
    //     const {current} = ViewTodosRef;
    //     if(ViewTodosClasses.includes(classes.LimitedHeight)){
    //         return;
    //     }
    //     if(current.clientHeight > 440){
    //         ViewTodosClasses.concat(classes.LimitedHeight);
    //     }
    //     console.log(current.clientHeight)
    // }) Q. Why it doesn't work??

    return <div className={ViewTodosClasses} ref={ViewTodosRef}>
        <TodosList />
    </div>
}

export default ViewTodos