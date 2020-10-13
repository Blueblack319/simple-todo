import * as actionTypes from "./actionTypes";

export const onError = (error) => {
    return {
        type: actionTypes.ON_ERROR,
        error
    }
}

export const offError = () => {
    return {
        type: actionTypes.OFF_ERROR,
        error: null
    }
}