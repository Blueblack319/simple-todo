import actionTypes from "../actions/actionTypes";

const initialState = {
    todosList: null,
    error: null,
    isAlamChecked: false,
    userNames: null
}

const todosReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOAD_TODOS_LIST_SUCCEED:
            return {
                ...state,
                todosList: action.todosList,
            }
        case actionTypes.TODOS_FAILED:
            return{
                ...state,
                error: action.error
            }
        case actionTypes.CHECK_TODAY:
            return {
                ...state,
                userNames: action.userNames
            }
        case actionTypes.CLOSE_ERROR:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.CLOSE_ALAM:
            return {
                ...state,
                userNames: action.userNames,
                isAlamChecked: action.isAlamChecked
            }
        default: return state
    }
} 

export default todosReducer