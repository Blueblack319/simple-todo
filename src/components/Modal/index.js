import React, {Fragment} from "react";
import {withRouter} from "react-router-dom";

import classes from "./Modal.module.scss";

import {connect} from "react-redux"
import * as actionCreators from "../../store/actions";
import Backdrop from "../Backdrop";

const Modal = ({error, closeError, closeAlam, userNames, history}) => {
    const handleAlamOff = () => {
        history.push("/view")
        closeAlam()
    }
    if(error){
        return <Fragment>
        <Backdrop isShowed={error}/>
        <div className={classes.Container}>
            <div className={classes.Title}>Error!</div>
            <p style={{fontSize: "17px"}}>{error}</p>
            <button className={classes.Icon} onClick={closeError}>CLOSE</button>
        </div>
        </Fragment>
    }
    if(userNames){
        const users = userNames.join();
        return <Fragment>
        <Backdrop isShowed={userNames !== []}/>
        <div className={classes.Container}>
            <div className={classes.Title}>Alam!</div>
            <p style={{fontSize: "17px"}}>{users} {userNames.length === 1 ? "has" : "have"} to do today!</p>
            <button className={classes.Icon} onClick={handleAlamOff}>VIEW</button>
        </div>
        </Fragment>
    }
    return null
}

// const mapStateToProps = (state) => {
//     return {
//         userNames: state.todosReducer.userNames
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        closeError: () => dispatch(actionCreators.closeError()),
        closeAlam: () => dispatch(actionCreators.closeAlam())
    }
}


export default connect(null, mapDispatchToProps)(withRouter(Modal));