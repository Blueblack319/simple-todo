import * as actionType from "../actions/actionTypes";

const initialState = {
    error: null
}

const errorSet = (state = initialState, action) => {
    switch(action.type){
        case actionType.ON_ERROR: return {error: action.error}
        case actionType.OFF_ERROR: return {error: action.error}
        default : return state
    }
}

export default errorSet;