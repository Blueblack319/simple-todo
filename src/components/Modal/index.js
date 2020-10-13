import React, {Fragment} from "react";

import classes from "./Modal.module.scss";

import {connect} from "react-redux"
import * as actionType from "../../store/actions/actionTypes";
import Backdrop from "../Backdrop";

const Modal = ({error, errorOff}) => {
    return (
        <Fragment>
            <Backdrop isShowed={error}/>
            <div className={classes.Container}>
                <div className={classes.Title}>Error!</div>
                <p style={{fontSize: "17px"}}>{error}</p>
                <button className={classes.Icon} onClick={errorOff}>CLOSE</button>
            </div>
        </Fragment>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        errorOff: () => dispatch({type: actionType.OFF_ERROR})
    }
}


export default connect(null, mapDispatchToProps)(Modal);