import actionTypes from "./actionTypes";
import axios from "../../axios-todos";

const todosFailed = (error) => {
    return {
        type: actionTypes.TODOS_FAILED,
        error
    }
}

const loadTodosListSucceed = (todosList) => {
    return {
        type: actionTypes.LOAD_TODOS_LIST_SUCCEED,
        todosList
    }
}

export const loadTodosList = (userId) => {
    return (dispatch) => {
        axios({
            method: "GET",
            url: `/todos-list.json?orderBy="userId"&equalTo="${userId}"`
        })
        .then((resData) => {
            const todosList = [];
            for (let key in resData.data){
                let count = 0;
                if (resData.data[key].todos !== undefined){
                    count = resData.data[key].todos.length
                }
                todosList.push({
                    userName: resData.data[key].userName, 
                    date: resData.data[key].date, 
                    id: key, 
                    count
                })
            }
            //console.log(todosList) // Q. Why didn't array.push return length of new array? // push는 length를 반환하니 concat으로 했더니 안됨...
            dispatch(loadTodosListSucceed(todosList));
        }).catch((err) => dispatch(todosFailed(err.message)))
    }
}

export const addTodos = (todos, date, userName, idToken, userId, history) => {
    return (dispatch) => {
        axios({
            method: "POST",
            url: "/todos-list.json",
            data: {
              todos,
              date,
              userName,
              idToken,
              userId,
            }
          }).then((res) => {
              history.push("/view")
          })
          .catch(err => dispatch(todosFailed(err.message)))
    }
}

export const editTodos = (todos, date, userName, idToken, userId, id, history) => {
    return (dispatch) => {
        axios({
            method: "PATCH",
            url: `/todos-list/${id}.json`,
            data: {
              todos,
              date,
              userName,
              idToken,
              userId,
            }
          }).then((res) => history.push("/view"))
          .catch(err => dispatch(todosFailed(err.message)))
    }
}

export const deleteTodos = (id, reloaded) => {
    return (dispatch) => {
        axios({
            method: "DELETE",
            url: `/todos-list/${id}.json`,
        })
        .then((res) => reloaded())
        .catch((err) => dispatch(todosFailed(err.message)))
    }
}

const checkTodaySucceed = (userNames) => {
    return {
        type: actionTypes.CHECK_TODAY,
        userNames
    }
}

export const checkToday = (userId, date) => {
    return (dispatch) => {
        axios({
            method: "GET",
            url: `/todos-list.json?orderBy="userId"&equalTo="${userId}"`
        })
        .then((res) => {
            const userNames = [];
            for (let key in res.data){
                if(date === res.data[key].date){
                    userNames.push(res.data[key].userName)
                }
            }
            return userNames;
        })
        .then((users) => {
            console.log(typeof users) // Why is it object??
            const userNames = users.length === 0 ? null : users
            dispatch(checkTodaySucceed(userNames))
        })
        .catch((err) => dispatch(todosFailed(err.message)))
    }
}

export const closeError = () => {
    return {
        type: actionTypes.CLOSE_ERROR,
        error: null
    }
}

export const closeAlam = () => {
    return {
        type: actionTypes.CLOSE_ALAM,
        userNames: null,
        isAlamChecked: true
    }
}